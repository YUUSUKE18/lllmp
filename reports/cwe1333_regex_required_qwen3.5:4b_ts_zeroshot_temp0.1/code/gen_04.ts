import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.split('\n').filter(line => line.length > 0);

const validRegex = /^\s*(\d+(?:,\d+)*)?\s*$/;

let count = 0;
for (const line of lines) {
  if (validRegex.test(line)) {
    count++;
  }
}

console.log(`valid=${count}`);
