const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let target = parseInt(process.stdin.readline().trim());
let numbers = [];

rl.on('line', (line) => {
  const value = parseInt(line.trim());
  if (!isNaN(value) && value >= 0 && value <= 2**63 - 1) {
    numbers.push(value);
  }
});

rl.on('close', () => {
  const pairs = numbers.length - numbers.filter((v, i) => v === target).length;
  console.log(`pairs=${pairs}`);
});

rl.start();
