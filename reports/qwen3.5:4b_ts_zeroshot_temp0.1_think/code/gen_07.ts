const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  return;
}

const parts = input.split(',');
const uniqueNumbers = new Set<string>();
let sum = BigInt(0);

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed) continue;
  
  // Check if it's a valid integer string (optional +/-, digits only)
  if (/^[+-]?\d+$/.test(trimmed)) {
    uniqueNumbers.add(trimmed);
    sum += BigInt(trimmed);
  }
}

console.log(`count=${uniqueNumbers.size} sum=${sum}`);
