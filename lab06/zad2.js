/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

const fun1 = (cb) => {
    setTimeout(() => {
        cb(123);
    }, Math.random() * 1000);
};

const fun2 = (cb) => {
    setTimeout(() => {
        cb(125);
    }, Math.random() * 1000);
};

const razem = (fun1, fun2, cb) => { 
    let values = [];
    fun1((wynik1) => {
        values.push(wynik1);
        if (values.length == 2)
            cb(values);
    });

    fun2((wynik2) => {
        values.push(wynik2);
        if (values.length == 2)
            cb(values);
    });
};

console.log("start");
razem(fun1, fun2, (wynik) =>  {
    console.log(wynik);
});

