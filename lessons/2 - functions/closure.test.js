/**
 * Implement a function that accepts a greeting, and returns a function that accepts a name.
 * The function should print ${greeting}, ${name}!
 *
 * e.g.
 * const greeter = createGreeter('Hello');
 * greeter('stranger'); // should print "Hello, stranger!"
 */

function createGreeter(greeting = 'Hello') {
  return function(name) {
    console.log(name ? `${greeting}, ${name}!` : 'No name provided :(');
  };
}

// test the function by using it to print "Well done, you!"
const greeter = createGreeter('Well done');
greeter('you');
