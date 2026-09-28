import { readFileSync } from 'fs';

const total = readFileSync(process.stdin, 'utf-8')
  .split('\n')
  .filter(line => !line.match(/^\s*$/))
  .map(line => {
    let count = 0;
    let n = parseInt(line);
    while (n !== 1) {
      if (n % 2 === 0) {
        n /= 2;
      } else {
        n = 3 * n + 1;
      }
      count++;
    }
    return count;
  })
  .reduce((a, b) => a + b, 0);

console.log(`total=${total}`);
