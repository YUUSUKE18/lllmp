const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let goal = parseInt(process.stdin.readline().strip());
let numbers: number[] = [];

rl.on('line', (line: string) => {
  if (isNaN(line)) return;
  const num = parseInt(line);
  if (!isNaN(num)) {
    numbers.push(num);
  }
});

rl.on('close', () => {
  if (numbers.length >= 2) {
    const pairs = numbers.filter((n, i) => numbers.some((m, j) => i !== j && n + m === goal));
    const validPairs = pairs.filter((pair) => pair[0] !== undefined && pair[1] !== undefined);
    const pairCount = validPairs.length;
    console.log(`pairs=${pairCount}`);
  }
});
