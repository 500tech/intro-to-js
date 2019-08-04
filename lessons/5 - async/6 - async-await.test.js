const posts = require('./posts.json'); // please disregard this line :)

/**
 * From this point on, please refactor to use as many promises (or better, async functions) :)
 */
const sleep = time => new Promise(resolve => setTimeout(resolve, time));
const asAsync = cb => async (...args) => {
  await sleep(Math.round(Math.random() * 300));
  return cb(...args);
};

const db = {
  __data: {
    posts
  },
  select: asAsync(function selectSync(query) {
    let results = db.__data[query.from];
    if (query.where) {
      results = results.filter(query.where);
    }
    if (query.select) {
      results = results.map(res =>
        query.select.reduce((rec, prop) => ({ ...rec, [prop]: res[prop] }), {})
      );
    }
    return JSON.parse(JSON.stringify(results));
  }),
  update: asAsync(function updateQuery(query) {
    let results = db.__data[query.from];
    if (query.where) {
      results = results.filter(query.where);
    }
    results.forEach(res => Object.assign(res, query.set));
  })
};

const connectToDatabase = asAsync(function connectToDatabaseSync(passwd) {
  if (passwd === 'foobar') {
    return db;
  }
  throw new Error('Could not connect to database');
});

async function complexDbLogic(dbPassword) {
  const db = await connectToDatabase(dbPassword);
  const [resultsFromFirstTen, resultsFromLastTen] = await Promise.all([
    db.select({
      select: ['id', 'title'],
      from: 'posts',
      where: ({ id }) => id < 10
    }),
    db.select({
      select: ['id', 'title'],
      from: 'posts',
      where: ({ id }) => id > 90
    })
  ]);
  const [{ title }] = resultsFromFirstTen
    .concat(resultsFromLastTen)
    .sort(({ title: t1 }, { title: t2 }) =>
      t1.length > t2.length ? -1 : t1.length < t2.length ? 1 : 0
    );
  await db.update({
    set: { title },
    from: 'posts',
    where: ({ id }) => id < 10
  });
  const results = await db.select({
    select: ['id', 'title'],
    from: 'posts',
    where: ({ id }) => id < 10
  });
  return results;
}

module.exports = () =>
  complexDbLogic('foobar')
    .then(console.log)
    .catch(console.error);
