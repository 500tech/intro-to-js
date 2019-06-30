// Implement "asAsync" as a function that returns a promise,
// instead of accepting a callback.

module.exports = () =>
  new Promise(resolve => {
    function asAsync(cb) {
      // implement this
    }

    const add = asAsync((x, y) => x + y);
    try {
      add(3, 4)
        .then(console.log)
        .then(resolve);
    } catch {
      resolve();
    }
  });
