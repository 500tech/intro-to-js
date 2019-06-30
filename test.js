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

const ASYNC = {
  'async/basic': {
    input: true,
    output: 'W1tbMywxMyw3OV1dXQ==',
  },
  'async/promises': {
    input: true,
    output: 'W1s3XV0=',
  },
  'async/async-await': {
    input: true,
    output:
      'W1tbeyJpZCI6MSwidGl0bGUiOiJzdW50IGF1dCBmYWNlcmUgcmVwZWxsYXQgcHJvdmlkZW50IG9jY2FlY2F0aSBleGNlcHR1cmkgb3B0aW8gcmVwcmVoZW5kZXJpdCJ9LHsiaWQiOjIsInRpdGxlIjoic3VudCBhdXQgZmFjZXJlIHJlcGVsbGF0IHByb3ZpZGVudCBvY2NhZWNhdGkgZXhjZXB0dXJpIG9wdGlvIHJlcHJlaGVuZGVyaXQifSx7ImlkIjozLCJ0aXRsZSI6InN1bnQgYXV0IGZhY2VyZSByZXBlbGxhdCBwcm92aWRlbnQgb2NjYWVjYXRpIGV4Y2VwdHVyaSBvcHRpbyByZXByZWhlbmRlcml0In0seyJpZCI6NCwidGl0bGUiOiJzdW50IGF1dCBmYWNlcmUgcmVwZWxsYXQgcHJvdmlkZW50IG9jY2FlY2F0aSBleGNlcHR1cmkgb3B0aW8gcmVwcmVoZW5kZXJpdCJ9LHsiaWQiOjUsInRpdGxlIjoic3VudCBhdXQgZmFjZXJlIHJlcGVsbGF0IHByb3ZpZGVudCBvY2NhZWNhdGkgZXhjZXB0dXJpIG9wdGlvIHJlcHJlaGVuZGVyaXQifSx7ImlkIjo2LCJ0aXRsZSI6InN1bnQgYXV0IGZhY2VyZSByZXBlbGxhdCBwcm92aWRlbnQgb2NjYWVjYXRpIGV4Y2VwdHVyaSBvcHRpbyByZXByZWhlbmRlcml0In0seyJpZCI6NywidGl0bGUiOiJzdW50IGF1dCBmYWNlcmUgcmVwZWxsYXQgcHJvdmlkZW50IG9jY2FlY2F0aSBleGNlcHR1cmkgb3B0aW8gcmVwcmVoZW5kZXJpdCJ9LHsiaWQiOjgsInRpdGxlIjoic3VudCBhdXQgZmFjZXJlIHJlcGVsbGF0IHByb3ZpZGVudCBvY2NhZWNhdGkgZXhjZXB0dXJpIG9wdGlvIHJlcHJlaGVuZGVyaXQifSx7ImlkIjo5LCJ0aXRsZSI6InN1bnQgYXV0IGZhY2VyZSByZXBlbGxhdCBwcm92aWRlbnQgb2NjYWVjYXRpIGV4Y2VwdHVyaSBvcHRpbyByZXByZWhlbmRlcml0In1dXV0=',
  },
};

const ADVANCED = {
  'advanced/generators':
    'W1swXSxbMV0sWzFdLFsyXSxbM10sWzVdLFs4XSxbMTNdLFsyMV0sWzM0XV0=',
  'advanced/data-structures': {
    input: [0, 2, 0, 2, 1, 1, 1, 1, 5, 0, 3, 8],
    output: 'W1swLDNdLFsxLDRdLFsyLDJdLFszLDFdLFs1LDFdLFs4LDFdXQ==',
  },
  'advanced/iterators':
    'W1sxMDBdLFsxMDFdLFsxMDJdLFsxMDNdLFswXSxbMV0sWzJdLFszXSxbNF0sWzVdXQ==',
  'advanced/properties':
    'W1tbImEiLCJiIiwiYyJdXSxbeyJhIjo1LCJiIjo3NiwiZCI6bnVsbH1dXQ==',
  'advanced/proxy': 'W1siQWRkZWQgcHJvcGVydHkgZm9vIHdpdGggdmFsdWUgNTUiXSxbIkFkZGVkIHByb3BlcnR5IGJhciB3aXRoIHZhbHVlIDU1Il0sWyJVcGRhdGVkIHByb3BlcnR5IGZvbyBmcm9tIDU1IHRvIDMiXSxbIkRlbGV0ZWQgcHJvcGVydHkgZm9vIl1d',
};

const TEST_RESULTS = {
  ...BASICS,
  ...FUNCTIONS,
  ...OBJECTS,
  ...CLASSES,
  ...ASYNC,
  ...ADVANCED,
};

async function test(testName) {
  const log = console.log;
  const prints = [];
  console.log = function(...args) {
    log(...args);
    prints.push(args);
  };
  try {
    const mod = require(`./lessons/${testName}.test`);
    const test = testName.split(' ').pop();
    if (typeof mod === 'function') {
      try {
        await mod(get(TEST_RESULTS, `${test}.input`));
      } catch {}
    }
    console.log = log;
    const output = get(TEST_RESULTS, `${test}.input`)
      ? get(TEST_RESULTS, `${test}.output`, [])
      : TEST_RESULTS[test];
    const expected =
      Array.isArray(output) || !output ? output : JSON.parse(decode(output));
    const result = isEqual(prints, expected)
      ? chalk.greenBright("YEAH! you're awesome!")
      : chalk.red('NOPE try again :)');
    console.log(
      [
        '======================================',
        result,
        '======================================',
      ].join('\n')
    );
  } catch (err) {
    console.error(err);
    console.log(
      [
        '======================================',
        chalk.red('NOPE try again :)'),
        '======================================',
      ].join('\n')
    );
  }
}

const lesson = process.argv.slice(2).join(' ');
test(lesson);
