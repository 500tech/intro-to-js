const keptPromise = Promise.resolve(5);
console.log(keptPromise);
keptPromise
  .then(value => console.log(`Value: ${value}`))
  .then(value => console.log(`Next value is: ${value}`));

const rejectedPromise = Promise.reject(6);
rejectedPromise
  .then(value => console.log(`Value: ${value}`))
  .then(value => console.log(`Next value is: ${value}`))
  .catch(value => console.log(`Rejected with value: ${value}`))
  .catch(value => console.log(`Rejected with value: ${value}`))
  .then(() => console.log('And now it is no longer rejected'));

const randomPromise = new Promise((resolve, reject) =>
  Math.random() > 0.5 ? resolve() : reject()
);

randomPromise
  .then(() => console.log('Random promise resolved'))
  .catch(() => console.log('Random promise rejected'));

function asAsync(cb) {
  return (...args) => {
    const onDone = args.pop();
    setTimeout(() => {
      let error = null;
      let value = null;
      try {
        value = cb(...args);
      } catch (e) {
        error = e;
      }
      onDone(error, value);
    }, Math.round(Math.random() * 1500));
  };
}

function promisify(asyncCallback) {
  return (...args) =>
    new Promise((resolve, reject) =>
      asyncCallback(...args, (err, val) => (err ? reject(err) : resolve(val)))
    );
}

const add = asAsync((x, y) => x + y);
add(1, 2, (_err, val) => console.log(val));
const addAsPromised = promisify(add);
addAsPromised(1, 2).then(console.log);

Promise.all([
  addAsPromised(3, 4),
  addAsPromised(1, 5),
  addAsPromised(2, 33),
  addAsPromised(23, 53),
]).then(console.log);
