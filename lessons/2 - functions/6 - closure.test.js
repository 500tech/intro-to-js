/**
 * Implement a function that accepts a greeting, and returns a function that accepts a name.
 * The function should print ${greeting}, ${name}!
 *
 * e.g.
 * const greeter = createGreater('Hello');
 * greater('stranger'); // should print "Hello, stranger!"
 */

function createGreater() {}

// test the function by using it to print "Well done, you!"

/**
 * Implement a function that caches results
 *
 * e.g.
 * const memoSum = memo((a, b) => a + b);
 * memoSum(1, 2)
 */

function memo(fn) {
}

const memoSum = memo((a, b) => a + b);
console.log(memoSum(1,3));
console.log(memoSum(1,3));
