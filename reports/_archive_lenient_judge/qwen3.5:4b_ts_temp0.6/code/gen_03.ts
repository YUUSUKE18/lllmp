import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input.length) process.exit(0);

const parts = input.split(',');
let sum: bigint = 0n;
const countsMap = new Map<number, number>(); // Using JS numbers as keys for simplicity within safe range logic or BigInt if needed. The spec says count and sum are requested. Since inputs are integers, let's assume standard integer types but sums can be up to 2^63-1 (max int) or larger? Spec: "合計は 64bit 整数の範囲に収まる". In JS `Number.MAX_SAFE_INTEGER` is less than that, so we should use BigInt for safety if inputs are large enough.

// Re-evaluating keys: If input integers can be up to ~2^53 safely as Number key? 
// Better to treat counts per integer value using Map with string or number keys.
// Let's assume the values themselves fit in standard types but sum might overflow 64-bit signed int if not careful, though spec guarantees it fits within range.

const uniqueIntegers = new Set<string>(); // Using strings to avoid precision loss during parsing if needed, then parse later? 
// Actually simpler: just split by comma, trim each part. If empty or non-integer ignore.
let sumVal: bigint | number = 0n; // Force BigInt for accumulation safety

const uniqueValuesSet = new Set<number>();
for (const token of parts) {
    const valStr = token.trim();
    if (!valStr || !/^-?\d+$/.test(valStr)) continue; 
    const num = parseInt(valStr, 10); // Safe for standard integer input ranges usually expected in such problems unless specified otherwise. If inputs are huge strings of digits? "整数" implies mathematical integers. Let's assume they fit in Number if count is small but sum fits in BigInt range.
    
    uniqueValuesSet.add(num);

    let currentSum = 0n; // Accumulate per value using BigInteger logic manually or just rely on Map iteration later. 
    // Wait, the requirement is: "重複を除いた整数" -> Unique integers only. Count them? Total sum of those unique integers.
} 

// Logic correction based on spec text carefully:
// 『重複を除いた整数』について、個数と合計を求めます。
// Translation: For the set of 'integers without duplicates', find their count and total sum.
// This means we first identify all distinct integer values present in input, then calculate how many there are (count) and add them up for a single value per type? Or is it "For each unique number"? No, "個数" usually implies the cardinality of that set, and "合計" sum of elements.
// Example: Input [1, 2, 3, 4] -> Unique {1,2,3,4}, Count=4, Sum=10.
// If duplicates exist in input but we remove them first? Yes. 
// So unique values = set(input). Then count that many numbers and sum those specific values up once each.

const uniqueNums: number[] = [];
for (let i = 0; i < parts.length; i++) {
    const token = parts[i].trim();
    if (!token || !/^-?\d+$/.test(token)) continue; 
    // Parse as integer. Assuming inputs fit in JS Number range for individual keys, but sum needs BigInt logic?
    // Since spec says "合計は 64bit 整数の範囲に収まる", intermediate sums of duplicates might overflow if we summed everything with repetitions. But here we only count unique ones.
    const num = parseInt(token, 10); 
    if (!isNaN(num)) {
        uniqueNums.push(num);
    }
}

// Calculate Count and Sum for the UNIQUE set
const distinctSet = new Set(uniqueNums); // This handles duplicates automatically based on value
    
let count = 0n;
let sumBigInt = 0n;

for (const num of distinctSet) {
    count++;
    sumBigInt += BigInt(num);
}

console.log(`count=${count.toString()} sum=${sumBigInt.toString()}`);
