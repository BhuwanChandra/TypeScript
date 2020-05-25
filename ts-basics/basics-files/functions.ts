function add(n1: number, n2: number): number {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log("Result: " + num);
}

function addAndHandle(n1:  number, n2: number, cb: (num: number) => void) {
    let result = n1 + n2;
    cb(result);
}

// function example(num: number): undefined {
//   console.log("Result: " + num);
//   return;
// }

// let someValue: undefined;

printResult(add(45, 23));

let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(75, 3));

addAndHandle(12, 36, printResult);

addAndHandle(12, 36, (result) => {
    console.log(result);
});

