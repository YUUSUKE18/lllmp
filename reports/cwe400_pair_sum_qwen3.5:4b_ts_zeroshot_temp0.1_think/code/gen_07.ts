const input = process.stdin.read();
if (!input) {
  console.log('pairs=0\n');
  return;
}

const lines = input.split('\n');
const cleanLines = lines.map(l => l.trim()).filter(l => l !== '');

if (cleanLines.length === 0) {
  console.log('pairs=0\n');
  return;
}

const target = BigInt(cleanLines[0]);
const nums: bigint[] = [];

for (let i = 1; i < cleanLines.length; i++) {
  const line = cleanLines[i];
  try {
    const val = BigInt(line);
    nums.push(val);
  } catch (e) {
    // Ignore non-integer lines
  }
}

const count = 0n;
const seen = new Map<bigint, bigint>();

for (const num of nums) {
  const needed = target - num;
  if (seen.has(needed)) {
    count += seen.get(needed);
  }
  seen.set(num, (seen.get(num) || 0n) + 1n);
}

console.log(`pairs=${count}\n`);
