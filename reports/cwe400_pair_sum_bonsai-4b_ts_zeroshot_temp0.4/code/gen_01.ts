const readline = require('readline');
const { createInterface, PromptStringReader } = require('node-readline');

const rl = new readlineInterface({
  input: PromptStringReader.create(),
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
  const pairs = numbers.length - target;
  if (pairs < 0) pairs = 0;
  if (pairs > 0) pairs = pairs;
  console.log(`pairs=${pairs}`);
});

rl.start();
