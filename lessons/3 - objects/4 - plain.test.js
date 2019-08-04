/**
 * A user object is defined as an object with the properties:
 * username: String
 * email: string
 * accountBalance: Number
 *
 * Implement one such user:
 */

const user = {
  username: 'user',
  email: 'user@kp.com',
  accountBalance: 300
};

function deriveActivityStatus(user) {
  return user.accountBalance > 1000;
}

/**
 * Implement a function that accepts a user, and returns an "enriched" user object.
 * An enriched user object has an "isActive" property (derived using deriveActivityStatus),
 * and all other user properties.
 */

const enrichUser = user => ({
  ...user,
  isActive: deriveActivityStatus(user)
});

const enrichedUser = enrichUser(user);

// Please don't change this :)
console.log(user.name === enrichedUser.name);
console.log(user.email === enrichedUser.email);
console.log(user.accountBalance === enrichedUser.accountBalance);
console.log('isActive' in user, 'isActive' in enrichedUser);
