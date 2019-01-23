/**
 * Implement the .call function method as a standalone function, without using
 * .call or .apply
 */

function call(context, fn, ...args) {
  return fn.bind(context, ...args)();
}

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greet(greeting) {
    console.log(`${greeting}, I am ${this.firstName} ${this.lastName}.`);
  }
}

const p = new Person('Jacob', 'Jacobson');
const greet = p.greet;
call(p, greet, 'Hello'); // Should print "Hello, I am Jacob Jacobson."

/**
 * Implement a bindAll function, which accepts a context and an array of method names.
 * The function should override the context properties with bound versions of the methods.
 */
function bindAll(context, methods) {
  for (let method of methods) {
    context[method] = context[method].bind(context);
  }
}

class PersonEx extends Person {
  constructor(...args) {
    super(...args);
    bindAll(this, ['greet']);
  }
}

const pe = new PersonEx('Mark', 'Markavian');
const shouldBeBoundGreet = pe.greet;
try {
  shouldBeBoundGreet('Hi'); // Should print "Hi, I am Mark Markavian."
} catch {}
