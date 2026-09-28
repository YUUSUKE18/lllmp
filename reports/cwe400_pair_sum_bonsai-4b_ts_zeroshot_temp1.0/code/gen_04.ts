import { Process } from 'readline-sync';

const readline = require('readline-sync');

const input = process.stdin.read().strip().split('\n');

const target = parseInt(input[0]);
const numbers = input.slice(1).map(line => line.trim()).filter(line => !isNaN(line));

const pairs = 0;
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
