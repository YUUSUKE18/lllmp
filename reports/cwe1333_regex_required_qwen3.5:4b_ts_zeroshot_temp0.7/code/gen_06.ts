import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').split('\n');

const validRegex = /^\s*[\d,\s]+\s*$/;

const count = input.filter((line) => validRegex.test(line)).length;

console.log(`valid=${count}`);
