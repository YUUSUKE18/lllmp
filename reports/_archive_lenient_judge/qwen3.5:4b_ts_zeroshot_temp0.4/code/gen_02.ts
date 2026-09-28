const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=');
} else {
    const numbers: number[] = [];
    for (const token of input.split(',')) {
        if (/^-?\d+$/.test(token.trim())) {
            numbers.push(parseInt(token, 10));
        }
    }

    const uniqueNumbers = new Set(numbers);
    
    let count = 0;
    let sum: number | bigint = BigInt(0); // Using BigInt to ensure safety for large sums
    
    for (const num of uniqueNumbers) {
        if (!isNaN(num)) {
            count++;
            sum += BigInt(num);
        } else {
             console.log('count=0 sum=');
             return;
        }
    }

    // If the set is empty or all numbers were NaN (unlikely with parseInt check but safe)
    if (uniqueNumbers.size === 0 || !sum.isFinite()) { 
         // Re-evaluating logic: uniqueNumbers contains only valid integers parsed above.
         // However, to be absolutely robust against edge cases where parsing might fail unexpectedly in a loop:
         const finalSum = sum;
        
        console.log(`count=${uniqueNumbers.size} sum=${finalSum}`);
    } else {
       console.log(`count=${uniqueNumbers.size} sum=${sum.toString()}`);
    }
    
    // More concise and robust version for the actual output block below:
}

// Re-implementing cleanly within a single flow to ensure correctness
const inputStr = process.stdin.read();
if (!inputStr) {
  console.log('count=0 sum=');
  return;
}

const tokens = inputStr.split(',').map(t => t.trim()).filter(t => /^[+-]?\d+$/.test(t));
const nums: number[] = [];
for (const token of tokens) {
    const val = parseInt(token, 10);
    if (!isNaN(val)) {
        nums.push(val);
    } else {
       // If we encounter an invalid integer string that passed regex but failed parse? 
       // The regex ensures valid integers. But let's handle the case where input is empty or all non-integers (handled by filter).
    }
}

const uniqueSet = new Set(nums);
let count = 0;
// Using BigInt for sum to prevent overflow if numbers are large, though spec says result fits in 64-bit.
// We'll cast back to string representation which handles the full range of JS Number (safe) or use BigInt logic.
// Since inputs fit such that SUM fits in 64bit int, standard number is fine unless individual input > 2^53.
// Let's stick to strict interpretation: "合計は 64bit 整数の範囲に収まります" -> output format should match this.

let totalSum = BigInt(0); // Use BigInt for accumulation safety during calculation
    
for (const n of uniqueSet) {
    if (!Number.isInteger(n)) continue; 
    count++;
    totalSum += BigInt(n);
}

console.log(`count=${uniqueSet.size} sum=${totalSum.toString()}`);
