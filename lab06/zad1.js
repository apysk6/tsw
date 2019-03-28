/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

const fun1 = (cb) => {
    setTimeout(() => {
        cb(123);
    }, Math.random() * 1000);
};

const fun2 = (wynik1, cb) => {
    setTimeout(() => {
        cb(wynik1 + 2);
    }, Math.random() * 1000);
};


const poKolei = (fun1, fun2, cb) => { 
    fun1((wynik1) => {
        fun2(wynik1, (wynik2) => {
            cb(wynik2);
        });
    });
};

console.log("start");
poKolei(fun1, fun2, (wynik2) =>  {
    console.log(wynik2);
});

