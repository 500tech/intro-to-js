// Strings!
const hello = 'Hello';
const name = 'world';
const greeting = `${hello}, ${name}!`;

console.log(greeting);

const passage =
  greeting +
  `
Goodbye!
`;

console.log(passage);

// Math!
/*
Basic operators apply: + - / %
*/

console.log(4 / 6);

// What happens if we use operators on non-nmbers?
console.log(true + false + '2');

/*
Implicit Casting order:
boolean -> number
any -> string?
*/

// We can explicitly cast into ints and floats:
const two = parseInt('2');
console.log(two === 2);

// Math is a global utility:
console.log(Math.floor(5.4));

// String methods
// RegEx syntax: </expression/flags>
// RegEx example: /\s/g (all whitespace)
const words = passage
  .toLowerCase()
  .trim() // remove whitespace at the start/end of string
  .replace(/[!@#$%^&*]/g, '') // replace weird characters by black strings
  .split(/\s+/g); // split by whitespace
console.log(words);
