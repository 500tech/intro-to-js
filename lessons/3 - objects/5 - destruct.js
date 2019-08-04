function printUsername({ username }) {
  console.log(username);
}

const user = { username: 'foo' };
printUsername(user);

const [first, ...tail] = [1, 2, 3, 4, 5];
console.log(first, tail);

// let's implement array's find:
function find(array, predicate) {
  const [result] = array.filter(predicate);
  return result;
}

console.log(find([1, 2, 3, 4], x => x % 2 === 0));

const deeply = {
  nested: {
    object: {
      props: [],
      foo: 'bar'
    }
  }
};

console.log(deeply, JSON.stringify(deeply)); // JSON.parse parses JSON encoded strings

const { nested } = deeply;
const { nested: nestedWithAnotherName } = deeply;
const {
  nested: { object }
} = deeply;
const {
  nested: { nonExisting = 5 }
} = deeply;
const {
  nested: {
    object: {
      props: [firstValue = 0],
      foo
    }
  }
} = deeply;

console.log({
  nested,
  nestedWithAnotherName,
  object,
  nonExisting,
  firstValue,
  foo
});
