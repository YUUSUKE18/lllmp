import { readFileSync } from 'fs';

const data = readFileSync('input.txt', 'utf8').split('\n');
const target = parseInt(data[0], 10);
const pairs = 0;

for (let i = 1; i < data.length; i++) {
  const num = parseInt(data[i], 10);
  if (Number.isNaN(num)) continue;
  for (let j = i + 1; j < data.length; j++) {
    const num2 = parseInt(data[j], 10);
    if (Number.isNaN(num2)) continue;
    if (num + num2 === target) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
