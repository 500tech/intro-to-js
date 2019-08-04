/**
 * The Reflect API lets us to do with function calls
 * many things we sould normally do with syntactic expressions.
 * Also, some other cool stuff. Observe:
 */

const user = {
  id: 0,
  username: 'foo'
};

console.log(Reflect.get(user, 'username')); // -> user.username
Reflect.set(user, 'password', 1234); // -> user.password = 1234
console.log(Reflect.get(user, 'password'));
Reflect.deleteProperty(user, 'password'); // delete user.password
console.log(user);
console.log(
  Reflect.has(user, 'password') ? 'User is protected' : 'User is public'
); // -> 'password' in user

class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }
}

const userInstance = Reflect.construct(User, [1, 'bar']); // new User(1, 'bar')
Reflect.ownKeys(userInstance)
  .map(prop => [prop, Reflect.get(userInstance, prop)])
  .forEach(([key, value]) => console.log(`${key}: ${value}`));

Object.defineProperties(user, {
  isPublic: {
    get() {
      return !Reflect.has(this, 'password');
    }
  }
});

console.log(user.isPublic);
const isPublicDescriptor = Reflect.getOwnPropertyDescriptor(user, 'isPublic');
console.log(isPublicDescriptor);
console.log(isPublicDescriptor.get());
