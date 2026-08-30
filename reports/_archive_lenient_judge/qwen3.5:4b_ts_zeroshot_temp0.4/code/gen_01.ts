const input = process.stdin.read().trim();
if (!input) return;

const numbers: number[] = [];
for (const token of input.split(',').map(s => s.trim())) {
  if (/^-?\d+$/.test(token)) {
    const num = parseInt(token, 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }
}

if (numbers.length === 0) return;

const uniqueNumbers = new Set<number>(numbers.map(Number)); // Ensure all are actually parsed as number just in case logic needed, but parseInt handles it. Actually the set should be of strings first to avoid duplicates if parsing fails? No, parseInt returns NaN or Number. Let's re-parse strictly inside loop for safety before adding to unique array.

const distinctNumbers: Set<number> = new Set();
for (let i = 0; i < numbers.length; i++) {
    const val = parseInt(numbers[i], 10);
    if (!isNaN(val)) {
        distinctNumbers.add(val);
    }
}

// Recalculate count and sum based on unique values to be absolutely sure we only process the set of integers found.
const sortedUnique = Array.from(distinctNumbers).sort((a, b) => a - b); // Sorting not strictly needed but good for debugging if any logic change; here just iterate.

let totalCount: bigint = 0n;
let totalSum: bigint = 0n;

for (const num of distinctNumbers) {
    const count = numbers.filter(n => n === num).length;
    
    // Use BigInt arithmetic to ensure no overflow even though spec says sum fits in 64-bit, it's safer.
    totalCount += BigInt(count); 
    totalSum += BigInt(num) * BigInt(count);
}

console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
