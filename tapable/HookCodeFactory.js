class HookCodeFactory{
    constructor(){

    }
    setup(hookInstance, options){
        hookInstance._x = options.taps.map(tapInfo=>tapInfo.fn)
    }

    args(config){
        // const { after } = config;
        let allArgs = [...this.options.args]
        // if(after){
            // allArgs.push(after)
        // }
        return allArgs.join(',')
    }

    //拼接代码的头部
    header(){
        let code = ``;
        code += `var _x=this._x;\n`;
        const interceptors = this.options.interceptors;
        if(interceptors.length>0){
            code+=`var _taps = this.taps;\n`;//tapsinfo的数组
            code+=`var _interceptors = this.interceptors;\n`;//拦截器的数组
            interceptors.forEach((interceptor, index)=>{
                if(interceptor.call){
                    code+=`_interceptors[${index}].call(${this.args()});\n`
                }
            })
        }
        return code
    }

    // callTapsSeries(){
    //     let code = ``;
    //     for(let j = 0; j < this.options.taps.length; j++){
    //         const tapContent = this.callTap(j)
    //         code+=tapContent
    //     }
    //     return code;
    // }

    //获取每一个回调他的代码
    callTap ( tapIndex, options={} ) {
        const { onDone } = options;
        let code = ``;
        const interceptors = this.options.interceptors;
        if(interceptors.length>0){
            code += `var _tap${tapIndex} = _taps[${tapIndex}];`
            interceptors.forEach((interceptor, index) => {
                if(interceptor.tap)
                code += `_interceptors[${index}].tap(_tap${tapIndex})`
            })
        }
        code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;//取出回调函数
        let tapInfo = this.options.taps[tapIndex]
        switch(tapInfo.type){
            case 'sync':
                code+=` _fn${tapIndex}(${this.args()});\n`
                if(onDone)code+=onDone();
                break;
            case 'async':
                code+=`_fn${tapIndex}(${this.args()}), function(){
                    if(--counter === 0)_done();
                })\n`;
            break;


        }

        return code
    }

    // 将 type arg 挂载
    init(options){
        this.options = options;
    }

    create(options){
        this.init(options);
        let fn;
        switch(options.type){
            //如果是同步的话
            case 'sync':
                fn = new Function(
                    this.args(),
                    this.header()+this.content()
                );
                break;
            case 'async':
                fn = new Function(
                    this.args({after:'_callback'}),
                    this.header()+this.content({onDone:()=>`_callback();\n`})
                )
                break;
            case 'promise':
                let tapsContent = this.content({onDone:()=>`_resolve();\n`})
                let content = `return new Promise(function(_resolive, _reject)){
                        ${tapsContent}
                })`;
            fn = new Function(
                this.args(),
                this.header()+content
                );
                break;
        }
        this.deinit();
        return fn
    }

    deinit(){
        this.options = null;
    }

    callTapsSeries(){
        let code = ``;
        for(let j=0;j<this.options.taps.length;j++){
            const tapContent = this.callTap(j);
            code+=tapContent;
        }
        return code
    }
    callTapsParallel({onDone}){
        const taps = this.options.taps;
        let code = ``;
        code+=`var _counter= ${taps.length};\n`;
        code+=`
        var _done = function(){
            ${onDone()}
        };
        `;
        for(let i = 0;i<taps.length;i++){
            const tapContent = this.callTap(i,{onDone:()=>`if(--_counter === 0) _done();`})
            code+=tapContent
        }
        return code;
    }

}
module.exports = HookCodeFactory;