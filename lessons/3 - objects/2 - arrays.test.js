const input = [
  82,
  76,
  52,
  10,
  17,
  14,
  40,
  73,
  99,
  69,
  46,
  13,
  77,
  26,
  62,
  22,
  30,
  97,
  68,
  91
];

// print the (sum) of the (square) of all the (odd/uneven) numbers in the input
const result = input
  .filter(num => num % 2 === 1)
  .map(num => num * num)
  .reduce((acc, curr) => (acc += curr), 0);
console.log(result);
