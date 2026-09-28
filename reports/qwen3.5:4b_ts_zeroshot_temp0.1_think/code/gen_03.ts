const input = process.stdin.read();
if (input === null) {
  console.log('count=0 sum=0');
  return;
}

const parts = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
const uniqueSet = new Set<BigInt>();
let sum = 0n;

for (const part of parts) {
  try {
    const num = BigInt(part);
    uniqueSet.add(num);
    sum += num;
  } catch (e) {
    // Ignore non-integer elements
  }
}

console.log(`count=${uniqueSet.size} sum=${sum}`);
