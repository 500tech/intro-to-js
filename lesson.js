const [lesson] = process.argv.slice(2);
require(`./lessons/${lesson}`);