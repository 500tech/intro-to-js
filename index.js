const cluster = require('cluster');
const globby = require('globby');
const eventToPromise = require('event-to-promise');
const { prompt } = require('enquirer');
const spawn = require('cross-spawn');

const LESSONS_DIR = './lessons/';

function spawnNodemonOnWindows(file, ...args) {
  return spawn('npx.cmd', ['nodemon', file, ...args], {
    detached: true,
    shell: true,
  });
}

function spawnNodemon(file, ...args) {
  return spawn('npx', ['nodemon', file, ...args], {
    detached: true,
    shell: true,
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  });
}

function spawnVSC(file) {
  return spawn('code', [file]);
}

async function chooseModule(modules) {
  const questions = [
    {
      type: 'select',
      name: 'moduleName',
      message: 'Select module',
      initial: 0,
      choices: modules.map(m => ({
        name: m,
        message: m,
        value: m,
      })),
    },
  ];
  const { moduleName } = await prompt(questions);
  return moduleName;
}

async function chooseLesson(lessons) {
  const questions = [
    {
      type: 'select',
      name: 'lesson',
      message: 'Select lesson',
      initial: 0,
      choices: lessons.map(([lesson, test]) => ({
        name: test ? `${lesson}.${test}` : lesson,
        message: lesson + (test ? ' [TEST]' : ''),
        value: test ? `${lesson}.${test}` : lesson,
      })),
    },
  ];
  const { lesson } = await prompt(questions);
  return lesson.split('.');
}

async function startLesson() {
  const lessons = await globby(`${LESSONS_DIR}**/*.js`);
  const modules = lessons
    .map(p => p.substring(LESSONS_DIR.length, p.length - 3).split('/'))
    .reduce((mods, [mod, lesson]) => {
      if (!mods[mod]) {
        mods[mod] = [];
      }
      mods[mod].push(lesson.split('.'));
      return mods;
    }, {});
  const activeModule = await chooseModule(Object.keys(modules).sort());
  const [lesson, test] = await chooseLesson(modules[activeModule]);
  return {
    path: `${activeModule}/${lesson}`,
    isTest: !!test,
  };
}

async function master(options = {}) {
  const { code } = options;
  const selector = cluster.fork();
  const { lesson } = await eventToPromise(selector, 'message');
  if (lesson) {
    if (code) {
      spawnVSC(
        `${LESSONS_DIR}${lesson.path}${lesson.isTest ? '.test' : ''}.js`
      );
    }
    const nodemon = process.platform.startsWith('win')
      ? spawnNodemonOnWindows
      : spawnNodemon;
    const app = nodemon(lesson.isTest ? 'test.js' : 'lesson.js', lesson.path);
    await eventToPromise(process, 'SIGINT');
    app.kill();
    return master(options);
  }
}

function child() {
  return startLesson()
    .then(lesson => process.send({ lesson }))
    .catch(() => process.send({ lesson: null }))
    .then(() => process.exit(0));
}

if (cluster.isMaster) {
  const { code } = require('yargs').options({
    code: {
      describe: 'Use with VSCode',
      type: 'boolean',
    },
  }).argv;
  master({ code });
} else {
  child();
}
