const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  return;
}

const parts = input.split(',').map(s => s.trim()).filter(s => s.length > 0);

const uniqueNumbers = new Set<BigInt>();
let count = 0;
let sum = 0n;

for (const s of parts) {
  if (/^[+-]?\d+$/.test(s)) {
    const num = BigInt(s);
    uniqueNumbers.add(num);
    count++;
    sum += num;
  }
}

console.log(`count=${uniqueNumbers.size} sum=${sum}`);
