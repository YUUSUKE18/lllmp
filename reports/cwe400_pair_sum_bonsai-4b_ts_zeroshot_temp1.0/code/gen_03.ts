const input = process.stdin.read();
const lines = input.trim().split('\n').filter((line) => {
  const stripped = line.trim();
  return !stripped && /^\d+$/.test(stripped);
});

let target = parseInt(lines[0]) || 0;
let numbers = [];

if (lines.length > 1) {
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i]);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }
}

const pairs = 0;
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
