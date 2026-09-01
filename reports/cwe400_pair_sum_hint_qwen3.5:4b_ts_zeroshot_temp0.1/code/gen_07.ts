const input = process.stdin.read().trim();
if (!input) {
  console.log('pairs=0');
  process.exit(0);
}

const lines = input.split('\n');
const target = parseInt(lines[0], 10);
if (isNaN(target)) {
  console.log('pairs=0');
  process.exit(0);
}

const numbers: number[] = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const num = parseInt(line, 10);
  if (!isNaN(num)) {
    numbers.push(num);
  }
}

const count = new Map<number, number>();
let pairs = 0n;

for (let i = 0; i < numbers.length; i++) {
  const num = numbers[i];
  const complement = target - num;
  if (count.has(complement)) {
    pairs += BigInt(count.get(complement)!);
  }
  count.set(num, (count.get(num) || 0n) + 1n);
}

console.log(`pairs=${pairs}`);
