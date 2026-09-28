const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  process.exit(0);
}

const parts = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
const uniqueSet = new Set<bigint>();
let sum = 0n;

for (const s of parts) {
  if (/^[-+]?\d+$/.test(s)) {
    const num = BigInt(s);
    uniqueSet.add(num);
    sum += num;
  }
}

console.log(`count=${uniqueSet.size} sum=${sum}`);
