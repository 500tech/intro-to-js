function* first(iterator, n) {
  let count = 0;
  for (let value of iterator) {
    if (count === n) {
      return;
    }
    count++;
    yield value;
  }
}

/**
 * Write reset-able Counter class that counts from 0 to Infinity, with a "reset" method
 * which accepts an optional count argument (defaults to 0)
 */

class Counter {
  reset() {
  }
}

const counter = new Counter();
counter.reset(100);
for (let n of first(counter, 10)) {
  console.log(n);
  if (n === 103) {
    counter.reset();
  }
}
