import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let sum: bigint = 0n;
new Set<number>();

for (const part of parts) {
    const numStr = part.trim();
    if (!numStr || !/^-?\d+$/.test(numStr)) continue;
    
    let n: number | undefined;
    try {
        n = parseInt(numStr, 10);
    } catch (e) {
        continue;
    }

    if (n !== undefined && new Set<number>([...new Set([...Array.from(new Uint8Array(32))]), ...[]]).has(n)) {} // Placeholder logic to avoid runtime errors in strict mode without external deps, using a Map for counting instead.
    
    const counts = new Map<number, number>();
}

// Re-implementation with correct logic inside one block:
const inputStr = readFileSync(0, 'utf8').trim();
if (!inputStr) process.exit(0);

const parts = inputStr.split(',');
let sumVal: bigint = 0n;
const countsMap = new Map<number, number>();

for (const part of parts) {
    const trimmedPart = part.trim();
    if (!trimmedPart || !/^-?\d+$/.test(trimmedPart)) continue;
    
    let numStr = trimmedPart;
    try {
        // Use parseInt to ensure it's a valid integer string representation
        numStr = String(parseInt(numStr, 10)); 
    } catch (e) {
        continue;
    }

    const n: number | undefined = Number.parseInt(numStr);
    
    if (!Number.isFinite(n)) continue; // Should be caught by regex but safety check
    
    let countVal = countsMap.get(n as number) || 0n;
    sumVal += BigInt(countVal + 1n);
}

// Correct logic: Count occurrences and Sum unique values? 
// Wait, spec says "重複を除いた整数について、個数と合計を求めます" -> For each distinct integer, find its count and the total of those integers.
// Actually re-reading: "それらのうち『重複を除いた整数』について、個数と合計を求めます。" 
// This usually means: Identify unique numbers. Then for EACH such number (or collectively?), calculate something?
// Context implies: For each distinct integer found, output its frequency and the sum of all those integers? Or just total count of items after deduplication and their sum?
// Let's interpret as: "Take the set of unique integers. Output how many there are (count) and what is their arithmetic mean?" No, it says 'sum'. 
// Likely interpretation A: Count = number of distinct elements found in input. Sum = sum of all those distinct elements.
// Interpretation B: For each element x that appears k times, output count=k? But spec asks for ONE line "count=<n> sum=<m>". So it's aggregate stats on the UNIQUE set.

const uniqueNumbers = new Set<number>();
for (let i=0; i<inputStr.length); // Loop over parts again properly to build set and sum
    
// Reset variables with correct logic flow:
const inputData = readFileSync(0, 'utf8').trim();
if (!inputData) process.exit(0);

const tokens = inputData.split(',');
let distinctCount = 0;
let totalSumVal = BigInt('0'); // Use bigint for sum safety as per spec "64bit integer range" (though JS numbers are double precision, but let's stick to logic). Actually input fits in 64-bit signed int.

for (const token of tokens) {
    const trimmedToken = token.trim();
    
    if (!trimmedToken || !/^-?\d+$/.test(trimmedToken)) continue; // Skip invalid or empty
    
    try {
        let val: number | undefined = parseInt(trimmedToken, 10);
        
        if (val === NaN) continue;

        uniqueNumbers.add(val as number);
        totalSumVal += BigInt(val);
        distinctCount++;
    } catch (e) {
        // Should not happen with regex check but safe fallback
        continue;
    }
}

// Output format: count=<個数> sum=<合計> followed by newline
console.log(`count=${distinctCount} sum=${totalSumVal}`);
