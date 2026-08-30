import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const trimmedPart = part.trim();
  if (/^-?\d+$/.test(trimmedPart)) {
    numbers.push(parseInt(trimmedPart, 10));
  }
}

numbers.sort((a, b) => a - b);
let uniqueCount = new Set<number>([]).size; // Initialize with empty set size (0), but we need to count actual unique elements. Let's use a Map or just iterate carefully. Actually, let's re-evaluate the logic for counting unique numbers and their sum correctly without external packages like 'set'.

// Re-implementation of Set-like behavior manually if needed, but standard JS has built-in types? The prompt says "external packages are not used". Standard library is allowed (like fs). Built-in objects like Map/Set are part of the language runtime, so they should be fine. However, to be absolutely safe and demonstrate logic:
// Let's use a simple approach with an object or array since we need count and sum for unique elements only.

const seen = new Set<number>(); // This is built-in JS, not external package like 'lodash' or 'moment'. It should comply. If strict "no standard library features" was implied it would be harder, but usually "external packages" means npm modules.
// Wait, the prompt says "外部パッケージは使わない". Standard Node.js globals (fs) are allowed? Yes, for reading input. Built-in JS objects like Set/Map are part of the language specification/runtime, not external packages. I will use them for clarity and correctness unless there's a reason to avoid them.
// Actually, let's double check if "Set" is considered an "external package". No, it's native. But to be extremely safe against any interpretation that might flag built-ins as risky in some strict environments (though unlikely), I can implement the logic with plain arrays and objects.

const uniqueNumbers = [];
for (let i = 0; i < numbers.length; i++) {
  if (!uniqueNumbers.includes(numbers[i])) {
    uniqueNumbers.push(numbers[i]);
  }
}

// Calculate count and sum
let count = uniqueNumbers.length;
let sum = 0n; // Use BigInt for safety, though prompt says fits in 64bit integer. JS numbers are double precision which can hold up to ~9e15 safely as integers? No, safe integer is +/- 2^53 - 1 (approx 9 quadrillion). If the sum exceeds that, we need BigInt. The prompt guarantees it fits in a "64-bit integer". In JavaScript, numbers are IEEE 754 doubles which have ~53 bits of precision for integers. A full signed 64-bit int can go up to 2^63-1 (~9e18). So standard JS `number` might lose precision if the sum is > 9e15. To be safe and correct, I will use BigInt or ensure logic handles it. Since output format doesn't specify type hint but implies integer math, using string concatenation with 'n' suffix isn't requested, just "count=sum". Wait, `sum=<合計>`. Usually integers are printed as numbers. If the sum is large, printing a JS number might lose precision if > 2^53-1.
// Let's use BigInt for calculation and then convert to string representation which handles arbitrary size correctly in Node.js when converted via toString().

const bigSum = uniqueNumbers.reduce((acc: bigint | number, val) => {
    // Cast current accumulator to bigint? Or just accumulate as numbers if we trust the prompt "fits in 64bit". 
    // If it fits in 64-bit signed integer (max ~9e18), JS Number is risky. Let's use BigInt for accumulation.
    const valBig = BigInt(val);
    return acc + valBig;
}, 0n);

// Convert back to string if needed, but toString() on bigint works fine in Node.js? 
// Actually, `BigInt` has a `.toString()` method in modern JS (ES2015+). Yes.
const sumStr = bigSum.toString(); // This ensures no precision loss for large 64-bit integers

console.log(`count=${uniqueNumbers.length} sum=${sumStr}`);
