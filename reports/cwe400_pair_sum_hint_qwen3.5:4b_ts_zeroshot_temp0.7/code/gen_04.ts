import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8');
const lines = input.split('\n');
const target = parseInt(lines[0], 10);
if (isNaN(target)) process.exit(0);

const numbers: number[] = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line === '') continue;
  const num = parseInt(line, 10);
  if (isNaN(num)) continue;
  numbers.push(num);
}

const n = numbers.length;
let count = 0n; // Use BigInt to prevent overflow during sum calculation if needed, though inputs fit in 64-bit.

// To optimize for large inputs, we can use a hash set approach or sort and two-pointer.
// Given "adversarial large input", sorting is O(N log N) which is efficient enough compared to O(N^2).
// However, since the constraints say values fit in 64-bit integers, let's consider the range.
// If the range of numbers is small, a frequency map (bucket approach) might be faster.
// But without knowing the specific upper bound, sorting is safer against adversarial large ranges with few elements.
// Actually, if N is large and values are sparse/large, O(N^2) TLEs.
// If N is small and values are dense, O(N^2) works.
// The problem asks for "practical time". Usually, this implies avoiding O(N^2).
// Let's use a Hash Set approach (O(N)) to find pairs efficiently.

const seen = new Set<number>();
for (let i = 0; i < n; i++) {
  const currentVal = numbers[i];
  // Check if (target - currentVal) exists in the set
  const complement = target - currentVal;
  if (seen.has(complement)) {
    count++;
  }
  seen.add(currentVal);
}

console.log(`pairs=${count}`);
