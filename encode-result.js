const { encode } = require('base-64');

const result = [['long'], [4], [5], [6], [7], [8], [9], [10], [11]];

console.log(encode(JSON.stringify(result)));
