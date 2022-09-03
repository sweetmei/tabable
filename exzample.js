const { SyncBailHook, SyncWaterfallHook, SyncLoopHook, AsyncParallelHook } = require("tapable");
// const hook = new SyncBailHook(["name", "age"]);  //SyncBailHook当函数返回非undefined,j就停止执行
// hook.tap("1", (name, age) => {
//   console.log(1, name, age);
//   //return 1;
// });
// hook.tap("2", (name, age) => {
//   console.log(2, name, age);
//   return 2;
// });
// hook.tap("3", (name, age) => {
//   console.log(3, name, age);
//   return 3;
// });

// hook.call("zhufeng", 10);



// const hook = new SyncWaterfallHook(["name", "age"]);  //只要有函数返回值作为下一个函数的参数
// hook.tap("1", (name, age) => {
//   console.log(1, name, age);
//   return ;
// });
// hook.tap("2", (name, age) => {
//   console.log(2, name, age);
//   return;
// });
// hook.tap("3", (name, age) => {
//   console.log(3, name, age);
//   return ;
// });

// hook.call("zhufeng", 10);



// let hook = new SyncLoopHook(["name", "age"]);   //当回调函数返回非undefined值的时候会停止调用后续的回调
// let counter1 = 0;
// let counter2 = 0;
// let counter3 = 0;
// hook.tap("1", (name, age) => {
//   console.log(1, "counter1", counter1);
//   if (++counter1 == 1) {
//     counter1 = 0;
//     return;
//   }
//   return true;
// });
// hook.tap("2", (name, age) => {
//   console.log(2, "counter2", counter2);
//   if (++counter2 == 2) {
//     counter2 = 0;
//     return;
//   }
//   return true;
// });
// hook.tap("3", (name, age) => {
//   console.log(3, "counter3", counter3);
//   if (++counter3 == 3) {
//     counter3 = 0;
//     return;
//   }
//   return true;
// });
// hook.call("zhufeng", 10);


// let queue = new AsyncParallelHook(["name"]);  //异步钩子同步完成
// console.time("cost");
// queue.tap("1", function (name) {
//   console.log(1);
// });
// queue.tap("2", function (name) {
//   console.log(2);
// });
// queue.tap("3", function (name) {
//   console.log(3);
// });
// queue.callAsync("zhufeng", (err) => {
//   console.log(err);
//   console.timeEnd("cost");
// });
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