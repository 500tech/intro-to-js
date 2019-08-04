/**
 * Reference for Array methods:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#
 */
const arr = [1, 2, 3, 4];
console.log(arr[0], arr.length);
for (let item of arr) {
  console.log(item);
}

// similar to:

const loop = arr.forEach(item => console.log(item));

console.log(loop); // notice that .forEach returns undefined

const evenNumbers = arr.filter(n => n % 2 === 0);
console.log(evenNumbers, arr); // filter returns a new array

/**
 * Nice to know: almost all Array methods that accept a callback, pass to the callback:
 * item, index, arrayRef
 *
 * e.g.
 * [423, 23, 44, 2].filter(function evenOrEvenIndexNumbers(n, idx) {
 *  return n % 2 === 0 || idx % 2 === 0;
 * });
 * returns:
 * [423, 44]
 */

const cubesOfNumbers = arr.map(n => Math.pow(n, 3));
console.log(cubesOfNumbers);

const countOfEvenNumbers = arr.reduce((count, n) => {
  if (n % 2 === 0) {
    return count + 1;
  }
  return count;
}, 0);
console.log(countOfEvenNumbers);

const runningAverage = arr.reduce((currentAvg, n) => (currentAvg + n) / 2);
console.log(runningAverage);

/**
 * Shallow copying:
 * .slice(startIndex=0, length=.length) returns a new sub-array.
 */

const shallow = arr.slice();
console.log(arr, shallow, arr === shallow);

// Or, you can use the spread (...) operator
const spread = [...arr];
console.log(arr, spread, arr === spread);
