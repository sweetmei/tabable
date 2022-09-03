class TapPromise{
    constructor() {
        this.taps=[];
    }
    tapPromise(name,fn) {
        this.taps.push(fn);
    }
    promise() {
        let promises = this.taps.map(fn => fn());
        return Promise.all(promises);
    }
}
let queue = new TapPromise(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });

});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(()=>{
    console.timeEnd('cost');
})