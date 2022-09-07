const  SyncHook = require('./tapable/syncHook')
const slice = Array.prototype.slice;
// class SyncHook {
//     constructor(args){
//         this.args = args;
//         this.taps = []
//     }
//     tap(name, callback){
//         this.taps.push(callback)
//     }
//     call(){
//         this.taps.forEach(fn=>fn(slice.call(arguments, 0, this.args.length)))
//     }
// }
const hook = new SyncHook(['name','age']);
hook.tap('1',(name,age)=>{
    debugger
    console.log(1,name,age);
    return 1;
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
    return 2;
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
    return 3;
});

hook.call('zhufeng',[1,2,3,4]);