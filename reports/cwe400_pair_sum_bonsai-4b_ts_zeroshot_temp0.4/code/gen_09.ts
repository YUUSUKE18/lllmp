const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let target = parseInt(process.stdin.readline().trim());
let numbers = [];

rl.on('line', (line) => {
  const num = parseInt(line.trim());
  if (!isNaN(num) && num >= 0 && num <= 2**63 - 1) {
    numbers.push(num);
  }
});

rl.on('close', () => {
  if (numbers.length >= 2) {
    const pairs = numbers.filter((_, i) => i < numbers.length - 1);
    const validPairs = pairs.filter(([a, b]) => a + b === target);
    console.log(`pairs=${validPairs.length}`);
  }
});

rl.start();
