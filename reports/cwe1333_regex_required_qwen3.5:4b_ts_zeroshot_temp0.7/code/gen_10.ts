import { readFileSync } from 'fs';

const input = readFileSync(0, { encoding: 'utf8' });

const regex = /^(?:\s*\d+(?:,\s*\d+)*?)?(?:,\s*$)?$/;

let count = 0;
for (const line of input.split('\n')) {
  if (regex.test(line)) {
    count++;
  }
}

console.log(`valid=${count}`);
