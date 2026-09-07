const fs = require('fs');
const data = fs.readFileSync(0, 'utf8').split('\n').filter(line => line.trim() !== '');

let memo = new Map<number, number>();
let total = 0;

for (const line of data) {
  let n = parseInt(line, 10);
  if (n <= 0) continue;

  let steps = 0;
  while (n !== 1) {
    if (memo.has(n)) {
      steps += memo.get(n);
      break;
    }
    memo.set(n, steps);
    steps++;
    n = n % 2 === 0 ? n / 2 : 3 * n + 1;
  }

  total += steps;
}

console.log(`total=${total}`);
