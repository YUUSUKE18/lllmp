const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  return;
}

// Remove all whitespace to handle spaces around commas and within tokens if any
const cleanInput = input.replace(/\s/g, '');

const parts = cleanInput.split(',');

let totalSum = 0n;
let totalCount = 0n;

for (const part of parts) {
  // Ignore empty elements
  if (!part) continue;
  
  // Match value:count format. Assuming integers for value, non-negative for count.
  const match = part.match(/^(-?\d+):(\d+)$/);
  if (match) {
    const value = BigInt(match[1]);
    const count = BigInt(match[2]);
    
    totalSum += value * count;
    totalCount += count;
  }
}

console.log(`count=${totalCount} sum=${totalSum}`);
