const input = process.stdin.read();
if (!input) {
  console.log('count=0 max=0');
  return;
}

const parts = input.split(',');
const numbers: bigint[] = [];

for (const part of parts) {
  const trimmed = part.trim();
  if (trimmed.length === 0) continue;
  
  try {
    const num = BigInt(trimmed);
    numbers.push(num);
  } catch (e) {
    // Ignore non-integers
  }
}

const count = numbers.length;
let max: bigint = 0n;

if (count > 0) {
  max = numbers[0];
  for (const num of numbers) {
    if (num > max) {
      max = num;
    }
  }
} else {
  // If no valid integers, default max to 0n to satisfy output format
  max = 0n;
}

console.log(`count=${count} max=${max}`);
