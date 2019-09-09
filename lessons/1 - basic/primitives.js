const a = 'hello';
const b = 'hello';
const c = `${b}`;

const username = 'admin';
const company = 'wework';
const email = `${username}@${company}.com`;
console.log(email);

console.log('Strings:', a === b, b === c);

const d = 1;
const e = '1';
// e = 1;

console.log('Numbers:', d == e, d === e);

const f = false;
console.log('Booleans:', f === 'false', f == 'false', f == 0);

const g = Symbol('my symbol');
const h = Symbol('my symbol');

console.log('Symbols:', g === g, g === h, g === 'my symbol');
console.log('Symbol.for:', Symbol.for('meow') === Symbol.for('meow'));
