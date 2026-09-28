const input = process.stdin.read();
const lines = input.trim().split(/\r?\n/).filter(l => l.trim() !== '');
let pairs = 0;
const target = parseInt(lines[0]);
const numbers = lines.slice(1).map(l => parseInt(l.trim(), 10));

for (let i = 0; i < numbers.length; i++) {
  const n = numbers[i];
  if (n > target) {
    pairs++;
  }
}

console.log(`pairs=${pairs}`);
