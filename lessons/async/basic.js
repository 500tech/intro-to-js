setTimeout(() => console.log('Hello, from the past!'), 1200);

const tid = setTimeout(() => console.error('BIG BAD ERROR'), 3000);
clearTimeout(tid);

let count = 0;
const iid = setInterval(() => {
  count++;
  console.log(count);
  if (count === 3) {
    clearInterval(iid);
  }
}, 300);

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

const add = asAsync((x, y) => x + y);
const v1 = add(77, 8, function(_err, val) {
  console.log(val);
});
console.log({ v1 });

// pyramid of doom!
add(7, 9, function(_err, val) {
  add(11, val, function(_err, val) {
    if (val % 4) {
      add(val, val, function(_err, val) {
        console.log(val);
      });
    }
  });
});
