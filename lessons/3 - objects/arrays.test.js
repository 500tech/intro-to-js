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
  91,
];
// const filter = predicate => array => array.filter(predicate);
// flow(input, filter(x => x < 5)) // []
// flow(input, filter(...), map(...), reduce(...))
/**
 *  print the (sum)
 *     of the (square)
 * of all the (odd/uneven) numbers
 *     in the input
 */
const filter = predicate => array => array.filter(predicate);
const map = mapper => array => array.map(mapper);
const reduce = (reducer, initialValue) => array =>
  array.reduce(reducer, initialValue);
const flow = (array, ...fns) => fns.reduce((value, fn) => fn(value), array);
const rflow = (array, ...fns) =>
  flow(
    array,
    ...fns.reverse()
  );

console.log(
  // input
  //   .filter(x => x % 2 === 1)
  //   .map(x => x * x)
  //   .reduce((sum, x) => sum + x, 0)
  rflow(
    input,
    reduce((sum, x) => sum + x, 0),
    map(x => x * x),
    filter(x => x % 2 === 1)
  )
);
