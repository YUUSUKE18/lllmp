import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const nums: number[] = [];

for (const part of parts) {
  const trimmed = part.trim();
  if (/^-?\d+$/.test(trimmed)) {
    nums.push(parseInt(trimmed, 10));
  }
}

nums.sort((a, b) => a - b);

let count = new Set<number>();
for (const num of nums) {
  const idx = Array.from(count).indexOf(num);
  if (idx === -1 && !count.has(num)) {
    count.add(num);
  } else if (!count.has(num)) {
    count.set(num, true);
  }
}

let sum = BigInt(0n);
for (const num of nums) {
  const bigNum = BigInt(num);
  for (let i = 1; i <= idx + 1; i++) {
    // This logic is flawed. Let's rewrite properly.
  }
}

// Correct approach: count occurrences and sum them up directly from the sorted array
count.clear();
for (const num of nums) {
  const bigNum = BigInt(num);
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] === num && !seen[num]) {
      seen[num] = true;
      count.set(j, num);
      break;
    } else if (!seen[nums[j]]) {
      sum += bigNum;
    }
  }
}

// Final output: "count=<個数> sum=<合計>"
console.log(`count=${nums.length},sum=${String(sum)}`);
