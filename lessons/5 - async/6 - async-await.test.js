const posts = require('./posts.json'); // please disregard this line :)

/**
 * From this point on, please refactor to use as many promises (or better, async functions) :)
 */
const sleep = (time, cb) => setTimeout(cb, time);
const asAsync = cb => (...args) =>
  sleep(Math.round(Math.random() * 300), () => {
    const onDone = args.pop();
    let error = null;
    let value = null;
    try {
      value = cb(...args);
    } catch (e) {
      error = e;
    }
    onDone(error, value);
  });

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

function complexDbLogic(dbPassword, onDone) {
  connectToDatabase(dbPassword, (err, db) => {
    if (err) {
      return onDone(err);
    }
    db.select(
      { select: ['id', 'title'], from: 'posts', where: ({ id }) => id < 10 },
      (err, resultsFromFirstTen) => {
        if (err) {
          return onDone(err);
        }
        db.select(
          {
            select: ['id', 'title'],
            from: 'posts',
            where: ({ id }) => id > 90
          },
          (err, resultsFromLastTen) => {
            if (err) {
              return onDone(err);
            }
            const results = resultsFromFirstTen.concat(resultsFromLastTen);
            results.sort(({ title: t1 }, { title: t2 }) =>
              t1.length > t2.length ? -1 : t1.length < t2.length ? 1 : 0
            );
            const [{ title }] = results;
            db.update(
              { set: { title }, from: 'posts', where: ({ id }) => id < 10 },
              err => {
                if (err) {
                  return onDone(err);
                }
                db.select(
                  {
                    select: ['id', 'title'],
                    from: 'posts',
                    where: ({ id }) => id < 10
                  },
                  (err, results) => {
                    if (err) {
                      return onDone(err);
                    }
                    onDone(null, results);
                  }
                );
              }
            );
          }
        );
      }
    );
  });
}

module.exports = () =>
  new Promise(resolve =>
    complexDbLogic('foobar', (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
      }
      resolve();
    })
  );
