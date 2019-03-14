/* jshint strict: global, esversion: 6, devel: true */
'use strict';

String.prototype.nbsp = function() {
	return this.replace(/(\s[aiouwz])\s/g, function(a) {
		return a + '&nbsp;';
	});
};

var tekst = 'Ala i As poszli w las';
console.log(tekst.nbsp());

