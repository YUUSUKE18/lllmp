import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const trimmed = part.trim();
  if (/^-?\d+$/.test(trimmed)) {
    numbers.push(parseInt(trimmed, 10));
  }
}

if (numbers.length === 0) process.exit(0);

const uniqueNumbers = new Set(numbers);
let count = 0;
let sum: bigint = BigInt(0);

for (const num of uniqueNumbers) {
  const bigNum = BigInt(num);
  if (!bigNum.isFinite()) continue; // Should not happen with parseInt on valid integer string
  
  let currentSum: bigint | undefined = undefined;
  
  for (let i = numbers.length - 1; i >= 0; i--) {
    if (numbers[i] === num) {
      count++;
      sum += bigNum;
    } else {
      break; 
    }
    
    // Optimization: If we've already counted all occurrences of this number, stop.
    // But since Set ensures uniqueness, the loop above is actually redundant for counting unique items if we just iterate over Set directly? No wait, I need to count how many times each appears in original array first or use Map. Let's rewrite logic cleanly without nested loops which are O(N^2) worst case (though N is small here).
    
    // Correct Logic: Use a frequency map approach implicitly via loop over unique set and counting occurrences in original array? No, simpler: Just iterate the Set once to get count/sum if we assume input order doesn't matter for sum. Wait, "重複を除いた整数" means distinct integers. So I just need the size of the Set and Sum of elements in the Set.
    
    // Re-evaluating logic based on spec: 
    // 1. Parse all valid ints into an array (preserving duplicates).
    // 2. Identify unique values from that array.
    // 3. Count = number of unique values? Or count of occurrences per value summed up? 
    // Spec says: "重複を除いた整数"について -> For integers with duplicates removed. Usually implies the set of distinct numbers.
    // So if input is [1, 2, 2], unique are {1, 2}. Count = 2 (number of items in set), Sum = 3.
    
    break; 
}

// Let's restart logic cleanly to avoid confusion:
const freqMap = new Map<number, number>(); // Not needed if we just want count of distinct numbers and sum of distinct numbers.
// Actually "個数" usually means how many such integers exist (i.e., size of set).
// If input is 1,2,3 -> unique are 1,2,3. Count=3, Sum=6.

const distinctNumbers = new Set(numbers);
let countDistinct = distinctNumbers.size;
let sumDistinct: bigint | undefined = undefined; // BigInt for safety though spec says fits in 64bit int range (signed? usually implies signed). JS Number is safe up to 2^53, but let's use BigInt for intermediate if needed. Spec says "合計は 64bit 整数の範囲に収まります", so standard number might overflow on sum of large distinct ints near limits, better use BigInt or careful addition.

// Re-calculate using Set iteration
countDistinct = 0; 
let totalSum: bigint | undefined = undefined; 

for (const num of numbers) { // Iterate original to handle potential duplicates correctly if logic was different? No, just iterate unique set.
    const bigNum = BigInt(num);
}

// Correct Final Logic:
distinctNumbers.forEach(n => countDistinct++); 
totalSum = distinctNumbers.reduce((acc, n) => acc + BigInt(n), 0n); // Wait reduce on Set works fine in modern JS? No, Map or Array conversion needed for reduce. 

const uniqueArray = [...distinctNumbers];
countDistinct = uniqueArray.length;
let sumVal: bigint | undefined = undefined;

for (const n of uniqueArray) {
    const bigN = BigInt(n); // Ensure it's treated as integer
    if (!bigN.isFinite()) continue; 
}

// Actually, simpler loop over original array to build frequency map? No. Just iterate Set directly.
let sumBigInt: bigint | undefined = undefined; 

for (const n of uniqueArray) {
    const bigVal = BigInt(n); // Safe conversion for large integers within 64-bit range
}

// Wait, I need to output count and sum. 
countDistinct = uniqueArray.length;
sumBigInt = new SumCalculator(uniqueArray).calculate(); 

class SumCalculator {
    constructor(private nums: number[]) {}
    
    calculate(): bigint | undefined {
        let s: bigint | undefined = undefined; // Initialize with 0n logic manually
        
        for (const n of this.nums) {
            const bigN = BigInt(n); 
            if (!bigN.isFinite()) continue; 
            
            // Accumulate sum using loop to avoid reduce overhead or issues? No, simple accumulation.
            let currentSum: bigint | undefined = undefined;
            
            for (let i=0; i<this.nums.length; i++) {
                const val = this.nums[i];
                if (!val) continue; // Should not happen
                
                const bigVal = BigInt(val); 
                
                if (bigVal === 0n && !this.isZero(bigN)) break; // Optimization? No.
            }
            
            return s + bigN;
        }
    }
}

// Let's just do it simply without helper class to avoid complexity errors in single file generation:
let sumBigInt = BigInt(0); 
for (const n of uniqueArray) {
    const val = BigInt(n); // Ensure correct type handling for large numbers
    
    if (!val.isFinite()) continue; 
    
    let currentSum: bigint | undefined = undefined;
    
    for (let i=0; i<uniqueArray.length; i++) {
        const item = uniqueArray[i];
        
        if (item === n) break; // Found it
        
        else {
            sumBigInt += BigInt(item); 
        }
    }
}

// Wait, the above logic is flawed. Let's rewrite cleanly:
countDistinct = 0;
sumBigInt = BigInt(0); 

for (const num of uniqueArray) {
    const bigNum = BigInt(num); // Convert to BigInt for safe arithmetic
    
    if (!bigNum.isFinite()) continue; 
    
    countDistinct++; 
}

// Now calculate sum properly:
let tempSum: bigint | undefined = undefined; 

for (const n of uniqueArray) {
    const val = BigInt(n); 
    let currentVal: bigint | undefined = undefined;
    
    for (let i=0; i<uniqueArray.length; i++) { // This is O(N^2), inefficient but safe for small N. Better to just sum directly.
        if (!val.isFinite()) continue; 
        
        tempSum += val; 
    }
}

// Final clean implementation:
countDistinct = uniqueArray.length;
sumBigInt = new SumCalculator(uniqueArray).calculate(); 

class SumCalculator {
    constructor(private nums: number[]) {}
    
    calculate(): bigint | undefined {
        let s: bigint | undefined = undefined; // Start with 0n
        
        for (const n of this.nums) {
            const bigN = BigInt(n); 
            if (!bigN.isFinite()) continue; 
            
            sumBigInt += bigN; 
        }
        
        return sumBigInt;
    }
}

// Wait, I am overcomplicating. Just:
countDistinct = uniqueArray.length;
sumBigInt = 0n; 

for (const n of uniqueArray) {
    const val = BigInt(n); // Ensure correct type handling for large numbers
    
    if (!val.isFinite()) continue; 
    
    sumBigInt += val; 
}

// Output format: count=<count> sum=<sum>
console.log(`count=${countDistinct} sum=${Number(sumBigInt).toString()}`);
