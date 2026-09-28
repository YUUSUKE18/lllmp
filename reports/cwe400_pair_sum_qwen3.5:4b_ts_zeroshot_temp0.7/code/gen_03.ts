const input = process.stdin.read().trim();
if (!input) {
  console.log('pairs=0');
  process.exit(0);
}

const lines = input.split('\n');
const target: number = Number(lines[0]);
if (isNaN(target)) {
  console.log('pairs=0');
  process.exit(0);
}

const numbers: number[] = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const num = Number(line);
  if (!isNaN(num)) {
    numbers.push(num);
  }
}

const count = new Map<number, number>();
let pairs = 0;

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
