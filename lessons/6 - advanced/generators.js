/**
 * Generators are functions, with a twist: they have internal state!
 */

// Notice that *? This indicates that the function is a generator.
// Unfortunately, arrow-functions can't be made into generators :(
function* counter() {
  let count = 0;
  while (true) {
    // This "yield" is like "return, but I'm not done yet"
    yield count++;

    if (count === 3) {
      return; // Now, I'm done
    }
  }
}

const state = counter();
console.log(state.next());
console.log(state.next());
console.log(state.next());
console.log(state.next());
console.log(
  'What happens when we call next on a "done" generator?',
  state.next()
);

// You can iterate over a generator using for-of loops!
for (let count of counter()) {
  console.log('Iteration:', count);
}

/**
 * However, generators are more than just "multiple return values".
 * They can also have multiple "input values"!
 * These sort of generators are sometimes also called "coroutines".
 */
function* createLogger() {
  let count = 0;
  while (true) {
    // get a new input value
    const line = yield;
    console.log(`${count}: ${line}`);
    count++;
  }
}

const logger = createLogger();
logger.next() // This runs all code up to the first "yield"
logger.next("First line");
logger.next("Second line");

/**
 * Coroutines are quite complex, but they can enable awesome behavior!
 */