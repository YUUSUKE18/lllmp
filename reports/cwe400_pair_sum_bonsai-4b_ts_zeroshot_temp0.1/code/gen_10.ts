const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let target = parseInt(process.stdin.readline().strip());
let numbers = [];

rl.on('line', (line) => {
  const num = parseInt(line.trim());
  if (!isNaN(num) && num >= 0 && num <= 2**63 - 1) {
    numbers.push(num);
  }
});

rl.on('close', () => {
  if (numbers.length >= 2) {
    const pairs = numbers.filter((n, i) => numbers.includes(n - target));
    const pairCount = pairs.length;
    console.log(`pairs=${pairCount}`);
  }
});

rl.start();
