const slice = Array.prototype.slice;

class SyncWaterfallHook {
 constructor(args){
    this.args=args;
    this.taps=[]
 }
 tap(name,fn){
   this.taps.push(fn)
 }
 call(){
    let result;
    let i=0;
    let args = slice.call(arguments,0);
    let hook ;//下一个hook的第一参数
    while(i<this.taps.length){
        hook = result || args[0]
        result = this.taps[i++]([hook, ...args.slice(1)])
    }
 }
}
const hook = new SyncWaterfallHook(['name','age']);
hook.tap('1',(name,age)=>{
    console.log(1,name,age);
    return 1;
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
    return;
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
    return 3;
});

hook.call('zhufeng',10);