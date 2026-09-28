const input = process.stdin.read().split('\n').filter(line => line.trim() !== '').map(line => parseInt(line, 10));
const target = parseInt(input[0], 10);
const pairs = 0;

for (let i = 1; i < input.length; i++) {
  const a = input[i];
  if (isNaN(a)) continue;
  const b = input[i + 1];
  if (isNaN(b)) continue;
  const val1 = a;
  const val2 = b;
  if (val1 >= 0 && val2 >= 0 && val1 + val2 === target) {
    pairs++;
  }
}

console.log(`pairs=${pairs}`);
