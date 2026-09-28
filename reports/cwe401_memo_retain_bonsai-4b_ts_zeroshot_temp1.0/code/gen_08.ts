const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let memo: { [n: number]: number } = {};

let total: number = 0;

rl.on('line', (line) => {
  const n = parseInt(line.trim());
  if (n === 1) {
    total += 0;
  } else if (n < 0) {
    return;
  }

  if (memo[n] !== undefined) {
    total += memo[n];
  } else {
    let steps = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    memo[n] = steps;
    total += steps;
  }

  rl.close();
});
