/**
 * Proxies are used to bridge the imperative interactions with objects.
 * Basically, every interaction you can imagine with an object, is "proxyable".
 */

const myObject = {
  a: 'foo',
};

const myProxiedObject = new Proxy(myObject, {
  get(original, property) {
    if (typeof property === 'string') {
      console.log(`Trying to access: .${property}`);
    } else {
      console.log(`Trying to access:`, property);
    }
    return original[property];
  },
  set(original, property, value) {
    console.log(`Trying to set: .${property} to ${value}`);
    original[property] = value;
    return true; // remember properties?
  },
  deleteProperty(original, property) {
    console.log(`Trying to delete: .${property}`);
    delete original[property];
    return true;
  },
});

console.log(myProxiedObject.a);
myProxiedObject.b = 30;
delete myProxiedObject.a;
console.log(myProxiedObject); // What's going on here???
