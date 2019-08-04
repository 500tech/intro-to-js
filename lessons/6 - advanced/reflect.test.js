/**
 * Re-implement the solution from the proxy test, but without using the:
 * '=', 'in' or 'delete' operators
 */

const ADDED = 'A';
const UPDATED = 'U';
const DELETED = 'D';

const addedProperty = (name, value) => ({ type: ADDED, name, value });
const updatedProperty = (name, value, oldValue) => ({
  type: UPDATED,
  name,
  value,
  oldValue
});
const deletedProperty = name => ({ type: DELETED, name });

function observeObject(object, onChange) {
  // implement this
  return object;
}

const obj = observeObject({}, change => {
  switch (change.type) {
    case ADDED: {
      return console.log(
        `Added property ${change.name} with value ${change.value}`
      );
    }
    case UPDATED: {
      return console.log(
        `Updated property ${change.name} from ${change.oldValue} to ${change.value}`
      );
    }
    case DELETED: {
      return console.log(`Deleted property ${change.name}`);
    }
  }
});

obj.foo = 55;
obj.bar = obj.foo;
obj.foo = 3;
delete obj.foo;
