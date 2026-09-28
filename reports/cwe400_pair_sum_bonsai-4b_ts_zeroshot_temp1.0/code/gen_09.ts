const readline = require('readline');
const { parseInt } = require('parseInt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let target = parseInt(process.stdin.readline().strip());
let numbers: number[] = [];

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (!trimmedLine) return;
  const value = parseInt(trimmedLine);
  if (!isNaN(value)) {
    numbers.push(value);
  }
});

// 2nd line onwards (start from index 1)
for (let i = 1; i < numbers.length; i++) {
  const line = process.stdin.readline().strip();
  if (line) {
    const value = parseInt(line);
    if (!isNaN(value) && value >= 0 && value <= 2**63 - 1) {
      numbers.push(value);
    }
  }
}

const pairs: number[] = [];
const n = numbers.length;

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    if (numbers[i] + numbers[j] === target) {
      pairs.push([i, j]);
    }
  }
}

console.log(`pairs=${pairs.length}`);
