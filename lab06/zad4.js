/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

const fun1 = (cb) => {
    setTimeout(() => {
        cb(125);
    }, Math.random() * 1000);
}

const fun2 = (cb) => {
    setTimeout(() => {
        cb(3)
    }, Math.random() * 1000)
}

const fun3 = (cb) => {
    setTimeout(() => {
        cb(120);
    }, Math.random() * 1000)
}

const razem = (functions, cb) => {
    let values = [];
    
    for (let i = 0; i < functions.length; i++) {
        functions[i]((wynik) => {
            values.push(wynik);
            if (values.length === functions.length) {
                cb(values);
            }
        })
    }
}

 razem([fun1, fun2, fun3], (values) => {
     console.log(values);
 });