/**
 * Modern JS brought with it some O(1) optimizations: Sets and Maps
 */

const values = new Set();
values
  .add(1)
  .add(2)
  .add(5)
  .add(1);
console.log(values);
console.log('Set inclusion?', values.has(2));
console.log('Set size?', values.size);
values.delete(2);
console.log('Set inclusion after delete:', values.has(2));
// we calso iterate over sets:
for (let v of values) {
  console.log(v);
}

// Like everything that can be looped over, you can create an array from a set:
const valuesArray = Array.from(values);
console.log(valuesArray);

const resourcesCache = new Map();
const user1 = { id: 0, username: 'foo' };
const user2 = { id: 1, username: 'bar' };

function getUserResources(user) {
  if (!resourcesCache.has(user)) {
    console.log(`expensive calculations... User: ${user.id}`);
    resourcesCache.set(user, 5);
  }
  return resourcesCache.get(user);
}

console.log(getUserResources(user1));
console.log(getUserResources(user1));
console.log(getUserResources(user2));
console.log(getUserResources(user2));

/**
 * Weak versions don't keep extra "pointers" to refs of objects.
 * Limitations:
 * - Can't use anything but objects as keys (WeakMap) or values (WeakSet)
 * - Doesn't have a .size property
 * - Can't loop over it with for-of loops or .forEach
 */

const authenticatedUsers = new WeakSet();
const authenticate = user => authenticatedUsers.add(user);
const isAuthenticated = user => authenticatedUsers.has(user);

function authorizeUser(user, password) {
  if (isAuthenticated(user)) {
    return user;
  }
  if (password === user.username) {
    console.log('Authenticating user...');
    authenticate(user);
    return user;
  }
}

const auser = authorizeUser(user1, 'foo');
const buser = authorizeUser(auser);
// Make sure this is the same ref...
console.log(auser === buser);
