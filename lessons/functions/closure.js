function outerFunction() {
  let value = 0;
  return function getAndIncrease() {
    return value++;
  };
}

const getValue = outerFunction();
console.log(getValue());
console.log(getValue());
console.log(getValue());
console.log(getValue());
console.log(getValue());
