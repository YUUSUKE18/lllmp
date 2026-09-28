import { strict as assert } from 'assert';

const input = process.stdin.read().trim();

let numbers: number[] = [];
let goal = parseInt(input.split('\n')[0], 10);

for (let i = 1; i < input.split('\n').length; i++) {
  const number = parseInt(input.split('\n')[i], 10);
  if (!isNaN(number)) {
    numbers.push(number);
  }
}

let count = 0;

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === goal) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
