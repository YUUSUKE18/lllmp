import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let sum: bigint = 0n;
const countMap = new Map<number, number>(); // Using Number for keys as per spec (64-bit integer range fits in JS safe integers usually, but strict BigInt usage requires care. However, the prompt asks to ignore elements that cannot be interpreted as integers. Standard JS numbers are double-precision floats which can exactly represent all 32-bit ints and many larger ones up to ~9e15. If inputs exceed this safely, they might lose precision when stored in Number keys. To strictly adhere to "64bit integer range", we should use BigInt for the sum calculation but map keys as strings or numbers if within safe limits. Given typical CP constraints and JS limitations, using a Set of Numbers is risky for very large integers > 2^53-1. Let's re-read: "合計は 64bit 整数の範囲に収まります". This implies the SUM fits in 64-bit int (signed). The individual inputs are also likely within reasonable bounds or at least representable as strings to be parsed safely into BigInts for counting if they exceed JS Number precision.
// Strategy: Parse each part, try to convert to a safe integer representation. If it's too large for Number but fits in 64-bit signed int (max ~9e18), we can use string keys or parse as BigInt and map by value. Since the output requires 'count' of unique integers, mapping by the actual numeric value is key.
// To be safe against precision loss: Parse to String first? No, "整数として解釈". 
// Let's assume inputs are valid integers within 64-bit range. We can use a Map with string keys if we want absolute safety, or Number if we trust input < 2^53+/-epsilon for uniqueness check (which is false).
// Better approach: Use BigInt to parse the value, then store in a Set of Strings? Or just Numbers if inputs are guaranteed small enough. 
// The spec says "64bit integer range". JS Number max safe int is ~9e15. 2^53-1 = 9007199254740992.
// If input is 9,000,000,000,000,000 (fits in BigInt), it might be stored as a Number incorrectly if > safe limit? Actually JS parses string to float64 which loses precision for large integers. 
// To ensure correctness: Parse each part into a String representation of the integer value using `BigInt` logic manually or rely on JSON.stringify/parse? No external packages.
// Let's use a Map where keys are Strings representing the canonical decimal form (e.g., "123", "-456"). This avoids precision issues entirely while satisfying "integer".

const uniqueValues = new Set<string>(); // Store as string to preserve exact integer representation without float loss
for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed || !/^-?\d+$/.test(trimmed)) continue; // Ignore non-integers or empty
  
  let val: bigint;
  try {
    val = BigInt(trimmed);
  } catch (e) {
    continue; 
  }

  uniqueValues.add(val.toString());
}

// Calculate sum and count from the set of valid integers found.
let totalSum: bigint = 0n;
const countsMap = new Map<string, number>(); // Count occurrences per value string

for (const valStr of uniqueValues) {
    const numVal = BigInt(valStr);
    totalSum += numVal;
}

// Wait, the spec says "重複を除いた整数について、個数と合計". 
// Does it mean: For each UNIQUE integer X present in input -> Output count(X)? No.
// It means: Count how many unique integers there are (N), and sum them up? Or for EACH unique integer, output its frequency?
// Re-reading: "それらのうち『重複を除いた整数』について、個数と合計を求めます。" 
// Interpretation A: Find the set of unique numbers. Output size of this set AND their total sum. (Most likely) -> count = number of unique items, sum = sum of those unique items.
// Interpretation B: For every distinct integer found in input, output its frequency and cumulative? No, format is fixed "count=<n> sum=<s>". 
// So it must be: Count = Number of Unique Integers. Sum = Sum of all these Unique Integers (or maybe sum of original list?).
// Usually "重複を除いた整数" implies the set S = {x | x in input}. Then count(S) and sum(S).
// Let's assume Interpretation A: 
// Count = Size of unique elements found.
// Sum = Sum of those unique elements (each counted once? Or original frequency?). 
// "重複を除いた整数" -> The set of integers without duplicates. So we take the distinct values. Then count them and sum them up.

const sizeOfUniqueSet = uniqueValues.size; // This is 'count'
let finalSum: bigint = 0n;
for (const valStr of uniqueValues) {
    const numVal = BigInt(valStr);
    finalSum += numVal;
}

console.log(`count=${sizeOfUniqueSet} sum=${finalSum}`);
