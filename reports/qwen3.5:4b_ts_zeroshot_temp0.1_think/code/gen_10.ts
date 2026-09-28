const input = process.stdin.read().trim();
const parts = input.split(',').map(s => s.trim());
const uniqueSet = new Set<bigint>();
let sum = 0n;

for (const part of parts) {
  if (!part) continue;
  const match = /^[-+]?\d+$/.test(part);
  if (match) {
    const num = BigInt(part);
    uniqueSet.add(num);
    sum += num;
  }
}

console.log(`count=${uniqueSet.size} sum=${sum}`);
