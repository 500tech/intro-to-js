const lambdaFunctionWithArgs = (arg1, arg2) => {
  console.log(arg1);
  console.log(arg2);
};

lambdaFunctionWithArgs(3, 2);

const lambdaWithOneArgument = arg => {
  return arg + 5;
};

console.log(lambdaWithOneArgument(3));

const lambdaWithoutBody = (x, y) => x + y;

console.log(lambdaWithoutBody(4, 6));

// implementing the closure test function
const createGreeter = greeting => name => console.log(`${greeting}, ${name}!`);
createGreeter('Hello')('world');
