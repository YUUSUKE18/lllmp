const stdin = process.stdin;
const lines = stdin.readAllLines() || [];

let target = 0;
let numbers = [];

for (const line of lines) {
  const trimmedLine = line.trim();
  if (!trimmedLine) continue;

  const value = parseInt(trimmedLine, 10);
  if (isNaN(value)) continue;

  target = value;
  numbers.push(value);
}

const pairs = [];
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      pairs.push([i, j]);
    }
  }
}

console.log(`pairs=${pairs.length}`);
