/**
 * A user object is defined as an object with the properties:
 * username: String
 * email: string
 * accountBalance: Number
 *
 * Implement one such user:
 */

const user = {};

function deriveActivityStatus(user) {
  return user.accountBalance > 1000;
}

/**
 * Implement a function that accepts a user, and returns an "enriched" user object.
 * An enriched user object has an "isActive" property (derived using deriveActivityStatus),
 * and all other user properties.
 */

const enrichedUser = {};

// Please don't change this :)
console.log(user.name === enrichedUser.name);
console.log(user.email === enrichedUser.email);
console.log(user.accountBalance === enrichedUser.accountBalance);
console.log('isActive' in user, 'isActive' in enrichedUser);
