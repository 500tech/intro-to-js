const log = require('../../logtrace');

function printUsername({ username }) {
  log(username);
}

const user = {
  username: 'foo',
  address: {
    city: 'Tel Aviv',
  },
  history: [],
  email: '',
  height: 140,
};
printUsername(user);

const { username, age = 40, ...otherDetails } = user;

log(username, age);
log(otherDetails);

const [first, ...tail] = [1, 2, 3, 4, 5];
log(first, tail);
const [,,fst,,moo] = [1, 2, 3, 4, 5];
log(fst, moo);

// let's implement array's find:
function find(array, predicate) {
  const [result] = array.filter(predicate);
  return result;
}

log(find([1, 2, 3, 4], x => x % 2 === 0));

const deeply = {
  nested: {
    object: {
      props: [],
      foo: 'bar',
    },
  },
};

log(deeply, JSON.stringify(deeply)); // JSON.parse parses JSON encoded strings

const { nested } = deeply;
const { nested: nestedWithAnotherName } = deeply;
const {
  nested: { object },
} = deeply;
const {
  nested: { nonExisting = 5 },
} = deeply;
const {
  nested: {
    object: {
      props: [firstValue = 0],
      foo,
    },
  },
} = deeply;

log({
  nested,
  nestedWithAnotherName,
  object,
  nonExisting,
  firstValue,
  foo,
});
