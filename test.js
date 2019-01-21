const chalk = require('chalk');
const { decode } = require('base-64');
const { isEqual, get } = require('lodash');

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

const OBJECTS = {
  'objects/arrays': 'W1s0Mzk2OF1d',
  'objects/plain': 'W1t0cnVlXSxbdHJ1ZV0sW3RydWVdLFtmYWxzZSx0cnVlXV0=',
  'objects/destruct': {
    input: {
      id: 101,
      email: 'jack@dev.com',
      personalInfo: {
        name: 'Jack',
        address: {
          line1: 'westwish st',
          line2: 'washmasher',
          city: 'wallas',
          state: 'WX',
        },
      },
    },
    output:
      'W1siVXNlciAxMDEgKGphY2tAZGV2LmNvbSlcbkphY2tcbndlc3R3aXNoIHN0ICh3YXNobWFzaGVyKSxcbndhbGxhcyxcbldYIl1d',
  },
};

const CLASSES = {
  'classes/syntax': 'W1siTXIuIEZvb2JhciJdLFsxNDQxXSxbZmFsc2VdLFt0cnVlXV0=',
  'classes/extend': 'W1t0cnVlXSxbZmFsc2VdXQ==',
  'classes/context':
    'W1siSGVsbG8sIEkgYW0gSmFjb2IgSmFjb2Jzb24uIl0sWyJIaSwgSSBhbSBNYXJrIE1hcmthdmlhbi4iXV0=',
};

const TEST_RESULTS = {
  ...BASICS,
  ...FUNCTIONS,
  ...OBJECTS,
  ...CLASSES,
};

function test(testName) {
  const log = console.log;
  const prints = [];
  console.log = function(...args) {
    log(...args);
    prints.push(args);
  };
  const mod = require(`./lessons/${testName}.test`);
  if (typeof mod === 'function') {
    mod(get(TEST_RESULTS, `${testName}.input`));
  }
  console.log = log;
  const output = get(TEST_RESULTS, `${testName}.input`)
    ? get(TEST_RESULTS, `${testName}.output`)
    : TEST_RESULTS[testName];
  const expected =
    Array.isArray(output) || !output ? output : JSON.parse(decode(output));
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
