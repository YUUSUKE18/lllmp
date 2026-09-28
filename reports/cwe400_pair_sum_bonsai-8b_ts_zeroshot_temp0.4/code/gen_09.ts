const numbers = [];
const lines = process.stdin.read().split('\n');

for (let line of lines) {
  if (line.trim() === '') continue;
  const num = parseInt(line, 10);
  if (!isNaN(num)) numbers.push(num);
}

const target = numbers[0] || 0;
const pairs = [];

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      pairs.push([i, j]);
    }
  }
}

console.log(`pairs=${pairs.length}`);
