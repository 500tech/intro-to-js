function uniqueValues(valuesArray) {
  // Implement this using a set
}

function instanceCount(valuesArray) {
  // Implement this using a map
}

module.exports = function(values) {
  const counts = instanceCount(values);
  for (let value of uniqueValues(values).sort()) {
    console.log(value, counts.get(value));
  }
};
