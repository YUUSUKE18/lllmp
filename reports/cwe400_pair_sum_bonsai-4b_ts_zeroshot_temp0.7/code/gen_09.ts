const readline = require('readline');
const { createInterface, closePRF } = require('node-readline');

const prf = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let targetValue: number;
let numbers: number[] = [];

prf.question('Target value:', (input) => {
  targetValue = parseInt(input);
  prf.closePRF();
});

prf.on('line', (input) => {
  const trimmed = input.trim();
  if (trimmed === '') return;
  
  const num = parseInt(trimmed);
  if (!isNaN(num) && num >= 0 && num <= 2**63 - 1) {
    numbers.push(num);
  }
});

prf.on('close', () => {
  const pairs = numbers.filter((a, i) => a + a === targetValue).length;
  prf.closePRF();
  
  if (pairs > 0) {
    console.log(`pairs=${pairs}`);
  } else {
    console.log(`pairs=0`);
  }
});
