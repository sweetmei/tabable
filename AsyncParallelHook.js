//异步并行钩子
const slice = Array.prototype.slice;

class AsyncParallelHook{
  constructor(args){
    this.taps = []
    this.args=args
  }
  tap(name, fn){
    this.taps.push(fn);//同步注册
  }
  callAsync(){
    let args = slice.call(arguments,0)
    let callback = args.pop()
    this.taps.map(fn=>fn(...args))
    callback()

  }
}

let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});