/**
 * Implement a function that adds a dynamic property called $$keys.
 * This property should return all keys of the object. When set to an array of strings,
 * Each property name in the array which doesn't exist on the object should be set to null,
 * and each property name defined on the object but not in the array, should be deleted.
 */
function enhanceObject(object) {
  return object;
}

const object = enhanceObject({
  a: 5,
  b: 76,
  c: 32
});

console.log(object.$$keys); // ['a', 'b', 'c']
object.$$keys = ['a', 'b', 'd'];
// object should now be { a: 5, b: 76, d: null }
console.log(object);
