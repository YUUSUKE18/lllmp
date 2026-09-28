const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let target = parseInt(process.stdin.readline().strip());
let numbers: number[] = [];

rl.on('line', (line) => {
  const value = parseInt(line.trim());
  if (!isNaN(value) && value >= 0 && value <= 2**63 - 1) {
    numbers.push(value);
  }
});

rl.on('close', () => {
  if (numbers.length >= 2) {
    const pairs = numbers.filter((_, i) => i < numbers.length - 1).filter((a, i) => a + b === target);
    const count = pairs.length;
    console.log(`pairs=${count}`);
  }
});
