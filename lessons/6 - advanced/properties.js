/**
 * Objects can have special properties, like getters and setters.
 * Let's have a look at some of these features.
 */

const obj = {};
let foo = 6;
Object.defineProperties(obj, {
  foo: {
    get: () => {
      console.log('Getting foo');
      return foo;
    },
    set(value) {
      foo = value;
      return true; // If a setter actually succeeds, you should return a truthy value
    },
  },
  staticValue: {
    value: 3,
  },
  countsAsProperKey: {
    enumerable: true,
    value: 'Meow',
  },
});

console.log(obj.foo);
obj.foo = 30;
console.log(obj.foo);
console.log(obj.staticValue);
obj.staticValue = 2;
console.log(obj.staticValue); // doesn't change
console.log(obj.countsAsProperKey, Object.keys(obj));
