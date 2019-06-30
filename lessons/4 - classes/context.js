class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}!`);
  }

  isLetterInName(letter) {
    function isLetterInName() {
      return this.name.includes(letter);
    }
    return isLetterInName(letter);
  }
}

const u = new User('Foo');
u.greet();
const greet = u.greet;
console.log(typeof greet);
try {
  greet();
} catch (e) {
  console.log('Oh no, an error!');
  console.error(e);
}

const boundGreet = u.greet.bind(u);
boundGreet();
u.greet.bind({ name: 'none of your business' })();
try {
  console.log(u.isLetterInName('o'));
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
