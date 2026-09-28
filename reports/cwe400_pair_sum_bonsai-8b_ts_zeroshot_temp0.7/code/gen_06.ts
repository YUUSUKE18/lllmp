const numbers = [];
const target = parseInt(process.stdin.readline()) || 0;

for (let i = 1; i < process.stdin.length; i++) {
  const line = process.stdin.readline();
  if (!line) break;
  const numStr = line.trim();
  if (/^-?\d+$/.test(numStr)) {
    const num = parseInt(numStr, 10);
    numbers.push(num);
  }
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
