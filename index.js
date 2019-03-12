export const queue = () => {
    let list = []; 
    let index = 0; 
    let isStop = false;
    let curArgs = [];
    let isParallel = false;

    const add = (...fns) => { 
        list.push(...fns);
    }
    const run = (...args) => { 
        if (!isStop) {
            const cur = list[index];
            curArgs = [args];
            typeof cur === 'function' && cur(next, ...args);
        }
    }
    const next = (...args) => { 
        if (!isStop && !isParallel) {
            const cur = list[++index];
            curArgs = [args];
            typeof cur === 'function' && cur(next, ...args);
        }
    }
    const stop = () => {
        isStop = true;
    }
    const retry = () => {
        isStop = false;
        run(...curArgs);
    }
    const goOn = () => {
        isStop = false;
        next(...curArgs);
    }
    const parallelRun = () => {
        isParallel = true;
        for(const fn of list) {
            fn(next)
        }
    }

    return {
        add,
        stop,
        retry,
        goOn,
        run,
        parallelRun
    }
}