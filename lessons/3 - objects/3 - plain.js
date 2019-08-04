const plainObject = {
  a: 4
};

console.log(plainObject, plainObject.a, plainObject['a']);

plainObject.b = plainObject['c'] = 3;
console.log(plainObject);

const meow = Symbol('meow');
plainObject[meow] = 6;
console.log(plainObject[meow], plainObject.meow);

const bar = true;

const objectWithComputedProperties = {
  ['hello' + 'World']: 'foo',
  bar
};

console.log(objectWithComputedProperties.helloWorld);

const withMethods = {
  printHello(name = 'stranger') {
    console.log(`Hello, ${name}!`);
  }
};

withMethods.printHello('meow');

console.log(Object.keys(plainObject));

// Shallow copying
// Object.assign(x, y, z, ...) assigns the keys and values of y into x, and then z's into x, and so forth
const shallow = Object.assign({}, plainObject);
console.log(plainObject, shallow, plainObject === shallow);
// Or, use spread (...) operator
const spread = { ...plainObject };
console.log(plainObject, spread, plainObject === spread);
