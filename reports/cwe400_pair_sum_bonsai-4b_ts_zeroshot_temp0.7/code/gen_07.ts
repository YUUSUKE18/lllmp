import { Process } from 'readline-sync';

const readline = require('readline-sync');

const input = process.stdin.read().split('\n').filter((line) => line.trim() !== '');
const target = parseInt(input[0], 10);

const pairs = 0;
for (let i = 1; i < input.length; i++) {
  const num = parseInt(input[i], 10);
  if (!isNaN(num)) {
    if (num >= 0) {
      if (num === target) {
        pairs++;
      }
    } else {
      if (num === -target) {
        pairs++;
      }
    }
  }
}

console.log(`pairs=${pairs}`);
