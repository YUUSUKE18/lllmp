import { readFileSync } from 'fs';

const data = readFileSync('/dev/stdin', 'utf8').split('\n');
let total = 0;

for (const line of data) {
  if (!line) continue;
  const n = parseInt(line, 10);
  if (Number.isNaN(n)) continue;

  let count = 0;
  while (n !== 1) {
    count++;
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
  }
  total += count;
}

console.log(`total=${total}`);
