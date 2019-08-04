// implement a function named "add" that adds 2 numbers together (or, you know, any 2 arguments)
function add(a, b) {
  return a + b;
}

// uncomment the line below when the function is ready
console.log(add(3, 4));

// implement a function named "sum" that adds up any number of arguments
// hint: (...args) is an array (we'll re-encounter those later). You can access its
// "length" property via args.length, and get item at index via args[index]
function sum(...args) {
  return args.reduce((accumulator, current) => (accumulator += current), 0);
}

// uncomment the line below when the function is ready
console.log(sum(3, 4, 11, 2));
