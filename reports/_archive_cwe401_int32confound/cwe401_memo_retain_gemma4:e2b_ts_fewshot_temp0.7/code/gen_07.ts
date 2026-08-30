const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo: Map<number, number> = new Map();
let totalSum = 0;
let lineNumber = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

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

  if (n === 1) {
    steps = 0;
  } else {
    // Memoization check
    if (memo.has(n)) {
      steps = memo.get(n)!;
    } else {
      // Calculate steps recursively/iteratively, but since the problem asks for the steps 
      // to reach 1, we calculate the path length.
      let temp = n;
      let count = 0;
      while (temp !== 1) {
        if (temp % 2 === 0) {
          temp /= 2;
        } else {
          temp = 3 * temp + 1;
        }
        count++;
      }
      steps = count;
      memo.set(n, steps);
    }
  }

  totalSum += steps;
  lineNumber++;
});

rl.on('close', () => {
  console.log(`total=${totalSum}`);
});
