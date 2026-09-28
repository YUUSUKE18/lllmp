const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  return;
}

const parts = input.split(',');
const uniqueNumbers = new Set<BigInt>();
let sum = 0n;

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed) continue;
  
  // Check if it is a valid integer string (allowing optional + sign)
  if (/^[+-]?\d+$/.test(trimmed)) {
    uniqueNumbers.add(BigInt(trimmed));
    sum += BigInt(trimmed);
  }
}

console.log(`count=${uniqueNumbers.size} sum=${sum}`);
