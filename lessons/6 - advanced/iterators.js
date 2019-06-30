/**
 * Iterators are defined as objects with a generator-method with the name:
 * Symbol.iterator
 * Not "Symbol.iterator", but the literal value.
 *
 * Some builtin iterators are: Array, Set, Map and a generator function's return value.
 *
 * Iterators are valid RHS of for-of loops.
 */

class DBTable {
  constructor(name) {
    this.name = name;
    this._items = [];
  }

  insert(item) {
    this._items.push({ ...item, id: this._items.length });
  }

  *[Symbol.iterator]() {
    for (let item of this._items) {
      yield item;
    }
  }
}

class DB {
  constructor() {
    this._tables = {};
  }

  createTable(name) {
    const table = new DBTable(name);
    this._tables[name] = table;
    return table;
  }

  *[Symbol.iterator]() {
    for (let table of Object.values(this._tables)) {
      yield table;
    }
  }
}

const db = new DB();
const users = db.createTable('users');
users.insert({ username: 'Foo' });
users.insert({ username: 'Bar' });
const resources = db.createTable('resources');
resources.insert({
  expires: Date.now(),
});

for (let table of db) {
  console.log(`======= ${table.name} =======`);
  for (let item of table) {
    console.log('\t', JSON.stringify(item));
  }
}
