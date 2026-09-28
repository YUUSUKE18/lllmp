import { readLines, Number } from 'readline';

const input = readLines();
const numbers = [];

for (const line of input) {
  const strippedLine = line.trim();
  if (!strippedLine) continue;
  const numStr = strippedLine.split(/\s+/);
  if (numStr.length === 0) continue;
  for (const numStr of numStr) {
    const num = Number(numStr);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }
}

const target = numbers[0];
const nums = numbers.slice(1);

const pairs = [];
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) {
      pairs.push([i, j]);
    }
  }
}

const count = pairs.length;

console.log(`pairs=${count}`);
