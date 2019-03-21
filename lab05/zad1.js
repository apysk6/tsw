/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const ocena = (kod)  => {
    return (ruch) => {
        let newMap = toMap(kod).(toMap(ruch));
        console.log(newMap);

        return newMap;
    }
}

const toMap = (tab) => {
    let map = new Map();
    tab.forEach((element, key) => {
        if (!map.has(element)) {
            map.set(element, new Set());         
        }

        map.get(element).add(key);
    });

    return map;
}

const kod = toMap([1, 3, 3, 2, 2]);
const ruch = toMap([2, 2, 3, 9, 2]);

console.log(kod);
console.log(ruch);

console.log(ocena(kod));