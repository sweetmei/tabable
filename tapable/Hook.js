


class Hook {
 constructor(args){
    this.args=args;
    this.taps=[];//存放回调函数
    this.call = CALL_DELEGATE
    this.callAsync = CALL_ASYNC_DELEGATE;
    this.promise = PROMISE_DELEGATE;
    this.interceptors = [];
    this._x = null;
    }
  tap(options, fn){
    this._tap('sync', options, fn)
  }
  _tap(type, options, fn){
    if(typeof options === 'string'){
        options={name: options}
    }
    const tapInfo = {...options, type, fn}
    this.runrunRegisterInterceptors(tapInfo);
    this._insert(tapInfo)
  }
  runrunRegisterInterceptors(tapInfo){
    for(const interceptor of this.interceptors){
        if(interceptor.register){
            interceptor.register(tapInfo)
        }
    }
  }
  _insert(tapInfo){
    this.resetCompilation();
    let before;
    if(typeof tapInfo.before == 'string'){
        before = new Set([tapInfo.before]);
    }else{
        before = new Set(tapInfo.before);
    }
    let stage = 0;
    if(typeof tapInfo.stage === Number){
        stage = tapInfo.stage;//新注册的回调 tapinfo的阶段值
    }
    let i = this.taps.length;
    while(i>0){
        i--;
        const x = this.taps[i];
        this.taps[i+1] = x;
        if(before){
            if(before.has(x.name)){
                before.delete(name);
                continue;
            }
            if(before.size>0){
                //说明还没超过所超越的回调
                continue;
            }
        }
        const  Xstage = x.stage || 0;
            if(Xstage>stage){
                continue;//如果当前值比要插入的值大，继续
            }
            i++;
            break;
    }
    this.taps[i] = tapInfo;
  }
  resetCompilation(){
    this.call = CALL_DELEGATE;//这是代理的CALL方法
    this.callAsync = CALL_ASYNC_DELEGATE;
  }
  _createCall(type){
    return this.compile({
        taps: this.taps,
        args: this.args,
        interceptors: this.interceptors,
        type
    })
  }
  

}
const CALL_DELEGATE = function (...args) {
//动态创建一个sync类型的call方法
this.call = this._createCall('sync');
return this.call(...args);
}
const CALL_ASYNC_DELEGATE = function (...args) {
this.callAsync = this._createCall('async');
return this.callAsync(...args);
}
const PROMISE_DELEGATE = function (...args) {
this.promise = this._createCall('promise');
return this.promise(...args);
}
module.exports = Hook;