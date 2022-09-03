const slice = Array.prototype.slice
class AsyncParallelHook {
 constructor(){
    this.taps = []
 }
 tapAsync(name, fn){
    this.taps.push(fn)
 }
 callAsync(){
    let args =  Array.from(arguments)
    let i = 0;
    let funclength = this.taps.length;
    let callback = args.pop();
    function _done(err){
        if(++i == funclength){
            callback(err)
        }
    }
    this.taps.map(fn=>{
        fn(...args, _done)
    })

 }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    setTimeout(function(){
        console.log(1);
        callback();
    },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});