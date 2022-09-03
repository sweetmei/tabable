class AsyncSeriesBailHook{
    constructor() {
        this.taps=[];
    }
    tapPromise(name,fn) {
        this.taps.push(fn);
    }
    promise() {
        let args=Array.from(arguments);
        let [first, ...fns] = this.taps;
        let promise =  fns.reduce((a, b) => {
            return a.then(() => b(),(err)=>Promise.reject(err));
        }, first(...args));
        return promise;
    }
}
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve){
       setTimeout(function(){
           console.log(1);
           resolve();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            reject('失败了');
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(data=>{
    console.log(data);
    console.timeEnd('cost');
},error=>{
    console.log(error);
    console.timeEnd('cost');
});