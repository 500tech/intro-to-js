function thisIsANamedFunction(argumentTheFirst, argumentTheSecond) {
  console.log(argumentTheFirst, argumentTheSecond);
}

thisIsANamedFunction(3, 4);

const thisIsAnAnonFunction = function(...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    console.log(i);
    sum += i;
  }
  return sum;
};

const sum = thisIsAnAnonFunction(3, 4, 5, 6);
console.log(sum);
