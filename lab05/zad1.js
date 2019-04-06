/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const ocena = (ruch)  => {
    let result = {
        black: 0,
        white: 0
    }

    kod.forEach( (value, index) => { 
        let ruchSet = ruch.get(index);
        
        if (ruchSet !== undefined) {
            let intersectionBlack = new Set([...value].filter(x => ruchSet.has(x)));
            result.black += intersectionBlack.size;

            let differenceWhite = new Set([...ruchSet].filter(x => !value.has(x)));
            if (differenceWhite.size > 0) {
                result.white += differenceWhite.size - intersectionBlack.size;
            }
        }
    } );

    return result;
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
const ruch = toMap([1, 3, 8, 3, 3]);

console.log(kod);
console.log(ruch);

console.log(ocena(ruch));