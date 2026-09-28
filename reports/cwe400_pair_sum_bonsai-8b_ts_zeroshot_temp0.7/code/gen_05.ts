const numbers = [];
const input = process.stdin.read().split('\n');

for (let line of input) {
  if (line.trim() === '') continue;
  const numStr = line.trim();
  if (/^-?\d+$/.test(numStr)) {
    const num = parseInt(numStr, 10);
    if (num === 0) continue;
    numbers.push(num);
  }
}

const target = numbers[0];
const pairs = [];

for (let i = 0; i < numbers.length; i++) {
  const num1 = numbers[i];
  for (let j = i + 1; j < numbers.length; j++) {
    const num2 = numbers[j];
    if (num1 + num2 === target) {
      pairs.push([i, j]);
    }
  }
}

console.log(`pairs=${pairs.length}`);
