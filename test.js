const chalk = require('chalk');
const { decode } = require('base-64');
const { isEqual } = require('lodash');

const BASICS = {
  'basic/flow-control':
    'W1sibG9uZyJdLFs0XSxbNV0sWzZdLFs3XSxbOF0sWzldLFsxMF0sWzExXV0=',
  'basic/logging':
    'W1siV2VsY29tZSB0byBJbnRybyB0byBKUyEiXSxbMzE1MzYwMDAsInNlY29uZHMgaW4gYSB5ZWFyIl1d',
  'basic/operations':
    'W1szMF0sWyJGb29CYXJAZ21haWwuY29tIl0sWyJmb29iYXJAZ21haWwuY29tIl0sW1siTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4iLCJBbGlxdWFtIG1heGltdXMgdWx0cmljZXMgZGlnbmlzc2ltLiBNb3JiaSBhdCB0aW5jaWR1bnQgbWkuIiwiQ2xhc3MgYXB0ZW50IHRhY2l0aSBzb2Npb3NxdSBhZCBsaXRvcmEgdG9ycXVlbnQgcGVyIGNvbnViaWEgbm9zdHJhLCIsInBlciBpbmNlcHRvcyBoaW1lbmFlb3MuIE51bGxhIG5lYyB2b2x1dHBhdCBzYXBpZW4uIiwiUHJvaW4gYWxpcXVhbSB2dWxwdXRhdGUgZWxpdCwgZXUgc2NlbGVyaXNxdWUgcmlzdXMgcGhhcmV0cmEgZXQuIiwiTWF1cmlzIGFsaXF1ZXQsIGZlbGlzIGluIHZ1bHB1dGF0ZSBpbnRlcmR1bSwgbWV0dXMgdGVsbHVzIHBvc3VlcmUgZXJhdCwiLCJhdCBsYW9yZWV0IG1ldHVzIHJpc3VzIHNlZCBsZW8uIEludGVnZXIgdGVtcG9yIGV4IHB1cnVzLiIsIlNlZCBpbiB0aW5jaWR1bnQgdXJuYS4gTW9yYmkgaWQgbWF0dGlzIHRvcnRvci4iXV1d',
};

const FUNCTIONS = {
  'functions/classic': 'W1s3XSxbMjBdXQ==',
  'functions/arrow': 'W1s3XSxbMjBdXQ==',
  'functions/closure': 'W1siV2VsbCBkb25lLCB5b3UhIl1d',
};

const TEST_RESULTS = {
  ...BASICS,
  ...FUNCTIONS,
};

function test(testName) {
  const log = console.log;
  const prints = [];
  console.log = function(...args) {
    log(...args);
    prints.push(args);
  };
  require(`./lessons/${testName}.test`);
  console.log = log;
  const expected = Array.isArray(TEST_RESULTS[testName]) || !TEST_RESULTS[testName]
    ? TEST_RESULTS[testName]
    : JSON.parse(decode(TEST_RESULTS[testName]));
  const result = isEqual(prints, expected)
    ? chalk.greenBright("YEAH! you'r awesome!")
    : chalk.red('NOPE try again :)');
  console.log(
    [
      '======================================',
      result,
      '======================================',
    ].join('\n')
  );
}

const [lesson] = process.argv.slice(2);
test(lesson);
