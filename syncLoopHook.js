const slice = Array.prototype.slice;

class SyncLoopHook{
    constructor(args){
        this.args = args
        this.taps = []
    }
    tap(name, fn){
        this.taps.push(fn)
    }
    call(){
        let result;
        let i=0;
        let args = slice.call(arguments,0);
        while(i<this.taps.length){
            result =  this.taps[i++](args)
            if(result){
                i = 0
            }
        }
    }

}
let hook = new SyncLoopHook(['name', 'age']);
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
hook.tap('1', (name, age) => {
    console.log(1, 'counter1', counter1);
    if (++counter1 == 1) {
        counter1 = 0
        return;
    }
    return true;
});
hook.tap('2', (name, age) => {
    console.log(2, 'counter2', counter2);
    if (++counter2 == 2) {
        counter2 = 0
        return;
    }
    return true;
});
hook.tap('3', (name, age) => {
    console.log(3, 'counter3', counter3);
    if (++counter3 == 3) {
        counter3 = 0
        return;
    }
    return true;
});
hook.call('zhufeng', 10);