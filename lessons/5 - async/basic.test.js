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

module.exports = () =>
  new Promise(resolve => { // Please ignore this line...
    // Implement a function that accepts an array of [asyncFunction, ...args] and a callback
    // which will be called with all (ordered) errors and values.
    function onAllDone(calls, cb) {
      // Implement this
    }

    onAllDone([[add, 1, 2], [add, 5, 8], [add, 99, -20]], (_errors, values) => {
      console.log(values); // Should print [3, 13, 79]
      resolve();
    });

    setTimeout(resolve, 1500); // Delete this when you're done :)
  });
