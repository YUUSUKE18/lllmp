import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(/\s*,\s*/).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
const uniqueValues = new Set(parts.map(String)); // Using strings to handle numeric comparison safely for duplicates logic if needed, but strictly "duplicate integers" implies numerical equality. However, standard JSON/TS parsing converts numbers correctly. Let's re-evaluate: `parts` array contains ints like [10, 20]. Duplicate check should be on the value itself.
// Correction: The input is comma-separated integers. E.g., "1, 2, 2". 
// parts will parse to [1, 2, 2] if split by ',' correctly. But `split(',')` might leave whitespace issues unless trimmed inside map or using regex better.

// Refined parsing logic:
const tokens = input.split(',').map(token => {
    const num = Number(token.trim()); // Handles float conversion attempt? Spec says integers. parseInt handles "10" -> 10, but if string is "1a", NaN. Filtered later.
    return isNaN(num) ? null : num;
});

const validNumbers: number[] = tokens.filter(n => n !== null);
// Sort to ensure stability or just use a Set for uniqueness logic on values? 
// The spec says "duplicate removed integers". So numerical value is key.
const uniqueNums = [...new Set(validNumbers)]; // Sets of primitives (numbers) work as keys in newer engines, but ES5 compatibility isn't guaranteed here without flags. Actually, `Set<number>` works fine.

let count = 0;
let sum = BigInt(0); 

for (const n of uniqueNums) {
    let c = validNumbers.filter(x => x === n).length; // Wait, this calculates frequency for each unique number? No. 
    // Spec: "For those among them [the duplicate-removed integers], find the count and sum."
    // Interpretation A: Filter out duplicates first -> get list of UNIQUE numbers. Count = size of that list. Sum = sum of those unique numbers.
    // Interpretation B: For EACH integer (even if duplicated in input), calculate its frequency? No, "duplicate removed" implies the set itself is processed once per value type.
    
    count++; 
}

// Re-calculate based on interpretation A (Unique values only)
const uniqueSet = new Set(validNumbers); // Note: In strict TS/Node without explicit flags, number keys in Set can be tricky if not sorted or specific engines used? Actually standard JS sets handle numbers fine. But to be safe and "code generator" style often implies robustness for all environments including older ones where numeric keys might behave oddly (though rare). Let's stick with String key logic which is safest across all Node versions, then cast. 
// Wait, if input is 10, it matches both '10' string and number 10.
// If I use Set<number>, it groups by value.

const sortedUnique = [...uniqueSet].sort((a,b) => a - b); // Sort for deterministic output (though not strictly required unless specified order matters). Spec doesn't specify order, but usually ascending is best practice.

let finalCount = 0;
let totalSumBig = BigInt(0);

// To ensure strict integer handling and avoid floating point issues if input was like "10" vs "10.0" (though spec says integers)
for (const val of sortedUnique) {
    // Use Number for comparison, then cast to BigInt for sum accumulation? 
    // Input is integers. 2^53 limit exists in JS numbers but Set handles equality correctly.
    finalCount++;
    
    // Accumulate using BigInt as requested ("64bit integer range")
    totalSumBig += BigInt(val);
}

// Wait, does "duplicate removed" mean we keep unique values? Yes.
// Example: Input 1,2,3 -> Unique {1,2,3}, count=3, sum=6.
// Example: Input 1,1,2 -> Unique {1,2}, count=2, sum=3.

console.log(`count=${finalCount} sum=${totalSumBig}`);
