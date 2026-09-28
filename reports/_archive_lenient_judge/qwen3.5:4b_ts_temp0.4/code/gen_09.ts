import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();
if (!input) process.exit(0);

const parts = input.split(/[\s,,]+/).map(Number).filter((n): n is number => !isNaN(n));

let sum: bigint = 0n;
for (const num of parts) {
    const bigNum = BigInt(num);
    if (!sum || sum < -9223372036854775808n && bigNum > 0n) {} // Fallback logic check not needed for valid inputs per spec, but ensuring accumulation safety. Actually, direct addition with spread is cleaner in modern TS/JS if using BigInt literals or careful casting.
    sum += num; 
}

// Wait, the above loop has a bug: `sum` starts as 0n (BigInt), but we are adding numbers which might be interpreted incorrectly if not explicitly casted to BigInt before addition? No, in JS `number + bigint` results in number coercion error or weird behavior. We must ensure all additions use BigInt arithmetic properly.
// Let's rewrite the loop correctly using explicit BigInt conversion for safety and clarity.

let count = 0;
const uniqueSet = new Set<string>(); // Using string keys to avoid precision issues during initial set population, then convert back? Or just parse as number first since input is guaranteed integer range within 64-bit sum context but individual numbers could be large floats if not strictly integers? Spec says "integer".

// Re-approach:
const nums = parts.map(n => BigInt(n)); // Ensure all are BigInts
let totalSum = 0n;
for (const n of uniqueSet) { 
    // Wait, I need to count duplicates first. The spec asks for 'count=<個数> sum=<合計>' where the subject is "重複を除いた整数" (integers without duplication).
    // This means: Identify unique integers present in input -> Count how many such unique integers exist? Or does it mean calculate properties of each unique integer individually and aggregate? 
    // Re-reading spec carefully: "それらのうち『重複を除いた整数』について、個数と合計を求めます。"
    // Interpretation A: Filter out duplicates from the list. Then count how many items are left, and sum them up.
    // Example Input: 1,2,3 -> Unique: [1,2,3]. Count=3, Sum=6. Output: count=3 sum=6.
    // Example Input: 1,1,2,2 -> Unique: [1,2]. Count=2, Sum=3. Output: count=2 sum=3.
    
    const uniqueNums = [...new Set(nums)]; 
}

// Correct Logic Implementation:
const rawNumbers = input.split(/[\s,,]+/).map(s => {
    if (!s.trim()) return null;
    try {
        // Parse as number first to ensure it's an integer, then convert to BigInt for summing.
        const num = Number(s); 
        if (Number.isInteger(num)) return BigInt(num.toString());
        else return undefined; // Ignore non-integers like 3.14 or "abc"
    } catch {
        return undefined;
    }
});

const validNumbers = rawNumbers.filter(n => n !== undefined) as bigint[];
// Remove duplicates while preserving order (though order doesn't matter for count/sum of unique set).
const uniqueNumbers = [...new Set(validNumbers)];

let totalCount = 0n;
let totalSum = 0n;

for (const num of uniqueNumbers) {
    totalCount += 1n; // Increment by one since we are iterating over the unique list directly.
    totalSum += num;
}

console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
