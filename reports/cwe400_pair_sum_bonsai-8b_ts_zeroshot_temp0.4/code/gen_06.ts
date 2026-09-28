const lines = process.stdin.read().split('\n');
const numbers = [];

for (let line of lines) {
  if (line.trim() === '') continue;
  const parts = line.trim().split(/\s+/);
  if (parts.length < 1) continue;
  const value = parseInt(parts[0], 10);
  if (!isNaN(value)) {
    numbers.push(value);
  }
}

const n = numbers.length;
let count = 0;

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    if (numbers[i] + numbers[j] === numbers[0]) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
