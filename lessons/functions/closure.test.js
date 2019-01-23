/**
 * Implement a function that accepts a greeting, and returns a function that accepts a name.
 * The function should print ${greeting}, ${name}!
 *
 * e.g.
 * const greeter = createGreater('Hello');
 * greater('stranger'); // should print "Hello, stranger!"
 */

function createGreater(greeting) {
  return name => console.log(`${greeting}, ${name}!`);
}

// test the function by using it to print "Well done, you!"
createGreater('Well done')('you');
