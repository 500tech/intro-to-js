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
 * Implement a generator that yields the fibonacci sequence, one number at a time
 */

function* fibonacci() {}

for (let n of first(fibonacci(), 10)) {
  console.log(n);
}
