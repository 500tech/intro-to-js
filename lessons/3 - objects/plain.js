const plainObject = {
  a: 4,
  4: 5,
};

console.log(plainObject, plainObject.a, plainObject['a']);

plainObject.b = plainObject['c'] = 3;
console.log(plainObject, plainObject[4]);
console.log(Object.keys(plainObject));
// const meow = Symbol('meow');
// plainObject[meow] = 6;
// console.log(plainObject[meow], plainObject.meow);

const bar = true;

const objectWithComputedProperties = {
  ['hello' + 'World']: 'foo',
  bar,
};

console.log(objectWithComputedProperties.helloWorld);

// const passwordSym = Symbol('password');
// const o = {
//   username: 'foobar',
//   [passwordSym]: '123456',
// };

// function getPassword(masterKey) {
//   if (masterKey) {
//     return o[passwordSym];
//   }
// }

// const arr = [1, 2, 3];
// const o = {
//   [Symbol.iterator]: function() {
//     return arr[Symbol.iterator]();
//   },
// };

// for (let x of o) {
//   console.log(x);
// }

const withMethods = {
  printHello(name = 'stranger') {
    console.log(`Hello, ${name}!`);
  },
};

withMethods.printHello('meow');

console.log(Object.keys(plainObject));

const obj = { a: 4 };
Object.assign(obj, { a: 3, b: 2 }, { b: 5, c: 0 });
console.log(obj);

// Shallow copying
// Object.assign(x, y, z, ...) assigns the keys and values of y into x, and then z's into x, and so forth
const shallow = Object.assign({}, plainObject);
console.log(plainObject, shallow, plainObject === shallow);
// Or, use spread (...) operator
const spread = { ...obj, ...plainObject,  };
// console.log(plainObject, spread, plainObject === spread);
console.log(spread);
