const input = process.stdin.read();
if (!input) {
  console.log('pairs=0');
  return;
}

const lines = input.split('\n');
let target: bigint | null = null;
const numbers: bigint[] = [];

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) continue;

  if (/^-?\d+$/.test(trimmed)) {
    const val = BigInt(trimmed);
    if (target === null) {
      target = val;
    } else {
      numbers.push(val);
    }
  }
}

if (target === null) {
  console.log('pairs=0');
  return;
}

let count = 0n;
const seen = new Map<bigint, bigint>();

for (const num of numbers) {
  const needed = target - num;
  if (seen.has(needed)) {
    count += seen.get(needed)!;
  }
  seen.set(num, (seen.get(num) ?? 0n) + 1n);
}

console.log(`pairs=${count}`);
