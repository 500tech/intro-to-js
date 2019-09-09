const log = (...args) => {
  let initiator = 'unknown place';
  try {
    throw new Error();
  } catch (e) {
    if (typeof e.stack === 'string') {
      let isFirst = true;
      for (const line of e.stack.split('\n')) {
        const matches = line.match(/^\s+at\s+(.*)/);
        if (matches) {
          if (!isFirst) {
            // first line - current function
            // second line - caller (what we are looking for)
            initiator = matches[1];
            break;
          }
          isFirst = false;
        }
      }
    }
  }
  const [, linecol] = initiator.match(/(\d+:\d+)\)$/);
  const [line] = linecol.split(':');
  console.log(`${line}:\n\t`, ...args);
};

module.exports = log;
