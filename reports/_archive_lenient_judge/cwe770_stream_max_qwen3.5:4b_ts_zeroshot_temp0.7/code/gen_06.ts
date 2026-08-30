import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (input === '') process.exit(0);

const parts = input.split(',');
let max: number | null = null;
for (const part of parts) {
    const num = Number(part.trim());
    if (!isNaN(num)) {
        let count = 1;
        if (max !== null && num > max) {
            count++;
            max = num;
        } else if (num >= max && max !== null) {
            // If equal, still increment count to ensure we track the total number of valid elements found so far that are <= current max? 
            // Wait, specification says "count" and "max". Usually this implies finding the count of all numbers AND their maximum value.
            // Let's re-read: "要素数と最大値を求めます" -> Find the element count (of the whole valid sequence) and the maximum value.
        } else if (!max && num > 0) {
             max = num;
        } 
    }
}

// Correct logic for Count and Max based on standard interpretation:
// Iterate through all numbers, find total count of valid integers, and track the maximum among them.
let minMax: number | null = null; // Represents negative infinity initially
let totalCount = 0;

for (const part of parts) {
    const numStr = part.trim();
    if (!numStr || !/^-?\d+$/.test(numStr)) continue; // Skip empty or non-integer strings
    
    let val: number | null = null;
    try {
        val = parseInt(numStr, 10);
    } catch (e) { continue; }

    if (!isNaN(val)) {
        totalCount++;
        minMax = minMax === null ? val : Math.max(minMax, val);
    }
}

let maxVal: number | undefined;
if (minMax !== null && !Number.isNaN(Number.MIN_SAFE_INTEGER) && Number.MAX_SAFE_INTEGER > 0) { // Just a sanity check logic flow
    maxVal = minMax as number; // Actually if we initialized with safe integer and updated correctly... wait.
}

// Let's rewrite the loop to be absolutely clear on initialization for negative numbers too.
const nums: number[] = [];
for (let i = 0; i < parts.length; i++) {
    const s = parts[i].trim();
    if (!s) continue; // Skip empty elements
    
    let n: number | null = null;
    try {
        n = parseInt(s, 10);
        if (n === Infinity || n === -Infinity || !Number.isFinite(n)) continue; 
    } catch {}

    if (n !== null && Number.isInteger(n)) { // Ensure it's an integer within safe range for display logic though spec says 64bit. Node JS number is double precision, covers most but not all integers up to 2^53 exactly? The prompt implies BigInt behavior or at least full 64-bit support. 
        nums.push(parseInt(s));
    }
}

// Re-calculate strictly for the output format
let total = 0;
let mx: number | null = null; // Initialize with a value lower than any possible int (like -Infinity logic) but since we want to handle negatives correctly, let's use flag.

for(let i=0; i<nums.length; i++){
    const v = nums[i];
    total++;
    
    if(mx === null || v > mx){
        mx = v;
    } else if(v == mx && mx !== null) {
         // If we encounter an equal max, do we increment? 
         // The spec asks for "count" (of elements). Yes. Count is total number of valid integers found regardless of value comparison until the end.
         // But wait, does it mean count only up to a certain point? No, just "element count".
    }
}

// Wait, my previous logic inside loop was slightly flawed in comment but correct in second pass above. 
// The variable `mx` needs proper initialization for negative numbers if not using null check carefully.
let finalMax: number | undefined = -Infinity; // JS Number.MIN_VALUE is 5e-324, so -9007199254740991 might be tricky with simple comparisons without BigInt? 
// Actually standard JavaScript `Number` handles integers up to ~9*10^18 (approx 2^63) in binary floating point representation exactly for the integer part if within safe range.
// Spec says "values fit in 64-bit integer". JS Number is double precision (53 bits significand). 
// This might lose precision for integers > 9e15. However, usually these coding tasks assume standard types unless BigInt is explicitly required or input constraints are huge but count logic doesn't need exact representation of the value itself other than comparison?
// To be safe and strictly follow "64-bit integer" spec without external packages (and avoiding precision loss if possible), we can treat them as strings for parsing then convert. But comparison with numbers is standard. 
// Given Node.js environment, `BigInt` exists natively in ES2015+. Let's use BigInt to ensure 64-bit exactness.

const bigNums: bigint[] = [];
for(let i=0; i<parts.length; i++){
    const s = parts[i].trim();
    if(!s) continue; 
    try {
        let n = parseInt(s); // JS Number parse first to check validity? No, use BigInt constructor directly.
        // Actually `BigInt` takes a string or number. If we pass a large integer as number it might lose precision before conversion.
        // Best is: const val = (Number.isInteger(Number(s)) && !isNaN(Number(s))) ? Number(BigInt(1) + 0n).toString() : ... 
        // Simpler: BigInt(stringify logic)? No, just use `BigInt(s)` if it parses correctly as integer.
        let bVal = null;
        try {
            const numStr = s;
            // Check if string represents an int (no decimals)
            if(!numStr.includes('.') && !isNaN(Number(numStr))) { 
                bVal = BigInt(numStr);
            } else { continue; }
            bigNums.push(bVal);
        } catch(e){}
    } catch {}
    
    // Wait, simpler approach: use `BigInt` constructor directly on the trimmed string. It will throw if not valid integer (like "123a"). 
    // But we need to handle potential leading/trailing spaces which trim handles. 
    // And what about floats like 123.0? Spec says "integer".
}

// Actually, `BigInt` constructor throws for non-integers usually if input is invalid string format? 
// BigInt("123") -> ok. BigInt("123.") -> Error: Invalid integer literal syntax (in some engines) or result 124n depending on implementation? No, BigInt rejects decimals in strict mode logic often but let's rely on regex first to be safe and fast without try-catch overhead for every char.
// Regex /^-?\d+$/ ensures it is an integer string.

let total = 0;
let maxVal: bigint | null = null; // Use BigInt for safety with full 64-bit range
const nums: bigint[] = [];

for(const s of parts){
    const strTrimmed = s.trim();
    if(!strTrimmed) continue; 
    // Regex to match integer string (optional minus sign followed by digits)
    if(/^(-)?\d+$/.test(strTrimmed)){
        let n: bigint | null = null;
        try{
            const val = BigInt(strTrimmed);
            nums.push(val);
            total++;
            
            // Update max using Math.max? No, no Math.max for bigints directly in JS without helper. 
            if(maxVal === null || val > maxVal){
                maxVal = val;
            } else {
                 // If equal to current max, does it affect the "max" value? No, just update count later or keep same max.
                 // The requirement is: output <count> and <max>. 
                 // Max remains the largest found so far. Count increments for every valid element.
            }
        }catch(e){}
    }
}

// Output format: count=<個数> max=<最大値>
console.log(`count=${total} max=${maxVal ?? '0'}`);
