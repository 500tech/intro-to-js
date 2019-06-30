const lesson = process.argv.slice(2).join(' ');
require(`./lessons/${lesson}`);
