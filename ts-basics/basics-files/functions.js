"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("Result: " + num);
}
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
// function example(num: number): undefined {
//   console.log("Result: " + num);
//   return;
// }
// let someValue: undefined;
printResult(add(45, 23));
var combineValues;
combineValues = add;
console.log(combineValues(75, 3));
addAndHandle(12, 36, printResult);
addAndHandle(12, 36, function (result) {
    console.log(result);
});
