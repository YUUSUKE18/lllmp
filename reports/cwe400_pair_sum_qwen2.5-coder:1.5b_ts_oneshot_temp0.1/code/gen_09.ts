import { readFileSync } from 'fs';

const data = readFileSync(0).toString('utf8').split(/\s+/);
const target = parseInt(data[0], 10);
const pairs = 0;

for (let i = 1; i < data.length; i++) {
  const n = parseInt(data[i], 10);
  if (Number.isNaN(n)) continue;
  if (target - n >= 0) {
    pairs++;
    target -= n;
  }
}

console.log(`pairs=${pairs}`);
