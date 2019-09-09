class User {
  constructor(name) {
    this.name = name;
    this.isLetterInName = this.isLetterInName.bind(this);
  }

  greet() {
    console.log(`Hello, my name is ${this.name}!`);
  }

  isLetterInName(letter) {
    const isLetterInName = () => {
      return this.name.includes(letter);
    };
    return isLetterInName();
  }
}

const u = new User('Foo');
u.greet();
// const greet = u.greet;
// console.log(typeof greet);
// try {
//   greet();
// } catch (e) {
//   console.log('Oh no, an error!');
//   console.error(e);
// }

const boundGreet = u.greet.bind(u);
boundGreet();
u.greet.apply({ name: 'none of your business' }, ['hello']);
try {
  const { isLetterInName } = u;
  console.log(isLetterInName('o'));
} catch (e) {
  console.log('Oh no, an error!');
  console.error(e);
}

class SuperUser extends User {
  constructor(name) {
    super(name);
    this.marioCall = () => console.log(`It's a-me, ${this.name}!`);
  }

  speak(text) {
    console.log(`${this.name}: "${text}"`);
  }
}

const su = new SuperUser('Bar');
su.greet();
su.marioCall();
const mc = su.marioCall;
console.log(typeof mc);
mc();
su.speak('Hello!');
const speak = su.speak;
speak.bind(su)('Hello');
speak.apply(su, ['Hello!']);
speak.call(su, 'Hello!');
