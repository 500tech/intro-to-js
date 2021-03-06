class User {
  static parseUser(serverResponse) {
    const { firstName, lastName } = JSON.parse(serverResponse);
    return new User(firstName, lastName);
  }

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  set name(fullName) {
    const [firstName, ...lastNames] = fullName.split(' ');
    this.firstName = firstName;
    this.lastName = lastNames.join(' ');
  }

  greet() {
    console.log(`Hello, ${this.name}!`);
  }

  toString() {
    return `<User Object>`;
  }
}

const user = new User('Bobby', 'Tables');
user.greet();
user.name = 'Foo Bar';
user.greet();

console.log(user, `${user}`);
console.log(
  User.parseUser(`{
  "firstName": "Buzz",
  "lastName": "Spam"
}`)
);
