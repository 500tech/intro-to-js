const value = 5;
if (value === 5) {
  // what would happen if we tried reffing 'x' here?
  console.log('fizz');
} else if (value === 3) {
  let x = 'buzz';
  console.log(x);
} else {
  console.log('foo');
}

for (let i = 0; i < value; i++) {
  console.log('bar');
}

const tri = value > 4 ? 'More than four' : 'Might be equal to four';

console.log(tri);

try {
  console.log(tri.foo.bar);
} catch (err) {
  console.error(err);
} finally {
  console.log('DONE');
}
