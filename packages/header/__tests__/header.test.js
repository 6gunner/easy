'use strict';

const header = require('..');
const assert = require('assert').strict;

assert.strictEqual(header(), 'Hello from header');
console.info('header tests passed');
