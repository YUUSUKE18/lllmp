import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const parts = line.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite);
  
  if (parts.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  const counts: Map<number, number> = new Map();
  let totalSum = BigInt(0n); // Use BigInt to ensure safety during accumulation before checking limits if needed, though spec says result fits in 64-bit. However, intermediate sums of potentially large distinct numbers might overflow JS Number (2^53). Spec says "sum is within range", implying the final answer fits. But let's use proper types for correctness given input can be up to ~9e18 if we assume max int inputs without knowing constraints on count vs value magnitude strictly, but spec implies output sum fits 64-bit integer (signed usually means +/-9e18).

  // Re-evaluating: "合計は 64bit 整数の範囲に収まります" -> The final SUM will fit.
  // We can use standard JS numbers if we trust the input won't cause overflow before summing, 
  // but using BigInt for accumulation is safer against precision loss during intermediate steps if inputs are large integers (e.g., > 2^53).

  let count = parts.length;
  
  const uniqueValues = new Set<number>();
  let currentSumBig: bigint | number = 0n as unknown as number; // Start with BigInt logic
  
  for (const num of parts) {
    if (!uniqueValues.has(num)) {
      uniqueValues.add(num);
      
      // Add to sum. Since final result fits in 64-bit integer, we can treat it carefully.
      // If inputs are huge but few distinct ones, or many small ones, JS Number precision is the risk area (2^53).
      // Let's use BigInt for accumulation to be safe and then convert if needed? 
      // Actually, converting back to number at end might lose info if it exceeds 2^53.
      // But spec says "sum fits in 64-bit integer". This usually implies signed 64-bit (Int64).
      // Max value ~9e18. JS Number max safe is ~9e15. 
      // So we MUST use BigInt for calculation to avoid precision loss, then format output?
      // Wait, if the sum fits in 64-bit integer, does it fit in standard JS number? No (2^53 < 2^63).
      // We should calculate using BigInt and print as string. Or assume inputs are small enough to stay within safe zone? 
      // Spec says "sum fits". It doesn't say input values are small. So we must handle large integers.

      const val = num;
      
      if (typeof currentSumBig === 'bigint') {
        currentSumBig += BigInt(val);
      } else {
         // If it was number, try to add with precision care? 
         // Better start everything as bigint logic for sums involving large ints.
         const valBigInt = BigInt(num);
         if (typeof currentSumBig === 'number') {
            // Convert existing sum to BigInt only at the very end or maintain state properly
             // Actually, let's just use a Map of counts and calculate sum dynamically with precision in mind?
             // Simplest robust approach: Store sums as strings/Bignits.
         }
      }
    } else {
       const val = num;
       if (typeof currentSumBig === 'number') {
          // If we are here, it means duplicate found, add to count but not sum again? 
          // No, logic: "unique integers". We only sum once per unique integer.
          continue;
      } else {
         const valBigInt = BigInt(val);
         currentSumBig += valBigInt;
      }
    }
  }

  // Correct Logic Rewrite to avoid complexity above
  
  let distinctCount = parts.length;
  
  // We need sum of UNIQUE integers.
  // Let's iterate again or do it in one pass correctly.
  
  const uniqueNumbersSet = new Set<number>();
  for (const n of parts) {
      if (!uniqueNumbersSet.has(n)) {
          uniqueNumbersSet.add(n);
      }
  }

  let sumBig: bigint | number = BigInt(0n); // Default to 64-bit signed max range check? No, just compute.
  
  for (const n of parts) { 
       if (!uniqueNumbersSet.has(n)) continue; // Already added
      
       const valBigInt = BigInt(n);
      
      // Check intermediate overflow relative to final constraint? 
      // Spec says FINAL sum fits in 64-bit integer range.
      // So we can safely accumulate using BigInt and print result as string representation of that number.
      // However, the output format "sum=<合計>" expects a standard integer display.
      
      if (typeof sumBig === 'bigint') {
          sumBig += valBigInt;
      } else {
           const temp = Number(valBigInt); 
           sumBig = BigInt(sumBig) + valBigInt; // Force bigint logic early on to avoid precision loss
      }
  }

  console.log(`count=${distinctCount} sum=${Number(sumBig)}`); 
});
