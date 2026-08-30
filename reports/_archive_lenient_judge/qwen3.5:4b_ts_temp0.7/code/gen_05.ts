import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();
if (!input) process.exit(0);

const parts = input.split(",");
const numbers: number[] = [];

for (let i = 0; i < parts.length; i++) {
    const trimmed = parts[i].trim();
    if (trimmed === "") continue;
    
    // Try to parse integer, ignore invalid ones
    let val: number | null;
    try {
        val = Number.parseInt(trimmed);
    } catch (_) {
        continue; 
    }

    if (!Number.isFinite(val)) continue;
    numbers.push(val);
}

// Use a Set to get unique elements without duplicates
const set = new Set(numbers);
let count = 0;
let sum: bigint = BigInt(0n);

for (const num of set) {
    if (!Number.isInteger(num)) continue; // Ensure it's actually an integer
    
    const bigNum = Number(BigInt(num));
    count++;
    
    // Use bit shift to ensure 64-bit addition overflow check is handled by BigInt 
    sum += (BigInt(bigNum) << 0n);
}

// Output the result in the exact format required: "count=<num> sum=<num>"
console.log(`count=${String(count)} sum=${sum.toString()}`);
