const size = object => Object.keys(object).length;
const poorMansDeepClone = data => JSON.parse(JSON.stringify(data));
const getRandom = max => Math.round(Math.random() * max);
const sleep = timeToSleep =>
  new Promise(resolve => setTimeout(resolve, timeToSleep));

const serverState = {
  posts: {},
};

function promisesNamespace() {
  const simulateSlowIO = fn => (...args) =>
    sleep(getRandom(1200)).then(() => fn(...args));

  const getPostsFromServer = simulateSlowIO(() =>
    poorMansDeepClone(Object.values(serverState.posts))
  );

  const savePostToServer = simulateSlowIO(post => {
    if (!post.title) {
      throw new Error('A post must have a title!');
    }
    const { id = size(serverState.posts) } = post;
    const p = {
      id,
      ...post,
    };
    serverState.posts[id] = p;
    return poorMansDeepClone(p);
  });

  function main() {
    const post = { title: 'My blog post', body: 'Lorem ipsum ' };
    return savePostToServer(post)
      .then(savedPost => {
        console.log(post, savedPost);
        return savePostToServer({
          ...savedPost,
          title: null,
        });
      })
      .catch(e => console.error(e))
      .then(() => getPostsFromServer())
      .then(console.log);
  }

  return main();
}

function asyncAwaitNamespace() {
  const simulateSlowIO = fn => async (...args) => {
    await sleep(getRandom(1200));
    return fn(...args);
  };

  const getPostsFromServer = simulateSlowIO(() =>
    poorMansDeepClone(Object.values(serverState.posts))
  );

  const savePostToServer = simulateSlowIO(post => {
    if (!post.title) {
      throw new Error('A post must have a title!');
    }
    const { id = size(serverState.posts) } = post;
    const p = {
      id,
      ...post,
    };
    serverState.posts[id] = p;
    return poorMansDeepClone(p);
  });

  async function main() {
    const post = { title: 'My blog post', body: 'Lorem ipsum ' };
    const savedPost = await savePostToServer(post);
    console.log(post, savedPost);
    try {
      await savePostToServer({
        ...savedPost,
        title: null,
      });
    } catch (e) {
      console.error(e);
    }
    console.log(await getPostsFromServer());
  }

  return main();
}

promisesNamespace();
// asyncAwaitNamespace(); // uncomment this line to test async-await
