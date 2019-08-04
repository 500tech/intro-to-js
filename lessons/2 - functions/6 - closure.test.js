/**
 * Implement a function that accepts a greeting, and returns a function that accepts a name.
 * The function should print ${greeting}, ${name}!
 *
 * e.g.
 * const greeter = createGreeter('Hello');
 * greater('stranger'); // should print "Hello, stranger!"
 */

function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

// test the function by using it to print "Well done, you!"
const greeter = createGreeter('Well done');
console.log(greeter('you'));

/**
 * Implement a function that caches results
 *
 * e.g.
 * const memoSum = memo((a, b) => a + b);
 * memoSum(1, 2)
 */

/*function memo(fn) {
	const cache = {};

	return function(...args) {
		if (cache[args]) {
			console.log('memoized result');
			return cache[args];
		}

		else {
			console.log('non-memoized result');
			return cache[args] = fn(...args);
		}
	}
}

const memoSum = memo((a, b) => a + b);
console.log(memoSum(1,3));
console.log(memoSum(1,3));*/
