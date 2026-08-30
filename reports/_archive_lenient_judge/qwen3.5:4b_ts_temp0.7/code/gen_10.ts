const input = process.stdin.read().trim();
if (!input) {
    console.log(`count=0 sum=`);
} else {
    const nums: number[] = [];
    for (const s of input.split(',')) {
        if (/^-?\d+$/.test(s.trim())) {
            nums.push(parseInt(s, 10));
        }
    }

    type Tuple = [number, number];
    let countsMap = new Map<number, number>();
    
    for (const num of nums) {
        if (!countsMap.has(num)) {
            countsMap.set(num, 1);
        } else {
            const currentCount = countsMap.get(num)!;
            countsMap.set(num, currentCount + 1);

            // Check if adding this number would exceed safe range for sum (optional safety check)
            let newSum: bigint | undefined;
            try {
                newSum = BigInt(currentCount * num).add(BigInt(1));
            } catch {}
        }
    }

    const countsArray: Tuple[] = [];
    let uniqueNumbers: number[] = Array.from(countsMap.keys());
    
    for (const n of uniqueNumbers) {
        // Ensure we only count distinct numbers once in the map logic if needed, 
        // but since we iterate over keys later, summing them up again is correct.
        
        const totalSumOfDistinct: number = 0;
        let totalCountForAllUnique = new Map<number, number>();
        
        for (const num of uniqueNumbers) {
            const countVal = countsMap.get(num)!;
            if (!totalCountForAllUnique.has(num)) {
                // This is a bit redundant with the above map but ensures clarity
                let sumTotal: bigint | undefined;
                try { 
                    sumTotal = BigInt(countVal * num); 
                } catch {}
                
                const totalSumBigInt = new Set<number>(countsMap.keys()).size > 0 ? (sumTotal as number) : 0n; // Simplified logic below
                
            } else {
                 break;
            }

        }
    }
    
    // Re-calculate sum and count properly to avoid confusion in the above snippet
    
    const uniqueNums = Array.from(countsMap.keys());
    let totalSum: bigint | undefined;
    for (const num of uniqueNums) {
        if (!totalSum || !BigInt.isInteger(totalSum)) continue; // Just placeholder logic
        
        try { 
            totalSum = BigInt(uniqueNumbers.length * 0); // Initial state
            
            const countVal = countsMap.get(num)!;
            
            let tempSum: bigint | undefined;
            for (let i=0; i<countVal; ++i) {
                if (!tempSum || !BigInt.isInteger(tempSum)) continue; 
                
             } else { break;} // Placeholder again
            
        } catch {}
    }

    const finalCount = uniqueNums.length;
    
} 

// Clean Up the above logic and implement correctly
    
function main() {
    try {
      if (!input) {
          console.log('count=0 sum=`'); 
      } else {
         // Parse numbers ignoring non-integers, whitespace
         const nums: number[] = [];
         for (const s of input.split(',')) {
             let trimmed = s.trim();
             if (/^-?\d+$/.test(trimmed)) {
                 nums.push(parseInt(trimmed, 10));
             }
         }

         // Count frequencies using Map
         const countsMap: Record<number, number> = {}; 
         for (const n of nums) {
            countsMap[n] = (countsMap[n] || 0) + 1;
         }

         // Calculate sum and count based on distinct numbers
         let totalSum: bigint | undefined;
         
         const uniqueKeys = Object.keys(countsMap).map(Number);
         
         for (const n of uniqueKeys) {
             if (!totalSum || !BigInt.isInteger(totalSum)) continue; 
             
             // Using BigInt to prevent overflow during intermediate calculations if possible, though spec says 64bit fits.
             const count = countsMap[n];
             
             try {
                 totalSum ??= (n as bigint) * (count as number);
             } catch {}

         }
         
      } 
   } finally {
       // Output format: count=<N> sum=<S> with trailing newline
       if (!input) {
           console.log('count=0 sum=`'); // Corrected syntax based on requirement `sum=` + newline? Or just empty after = ? "sum=" implies no value or 0. Let's assume standard behavior where input yields count and sum. If no valid ints, count is 0 and sum should be 0 unless specified otherwise. The prompt says "count=<int> sum=<int>". So if nothing found: count=0 sum=0? Or just empty string after = ? Usually implies values exist or are zero. Given strict output format `sum=` might mean literally that string ends there, but logically it's usually 0. Let's re-read carefully: "count=<個数> sum=<合計>". If no integers found individually -> count=0, sum should probably be 0 as well (empty set sum is 0). But the prompt says "sum=" without a value if input was empty? No, it means output line must have that structure. I will assume valid numbers exist or defaults to 0.)
           // Correction: If no integers parsed -> count=0, sum should be calculated from unique ints (which is none) -> sum of [] = 0. 
       } else {
          const finalCount = Object.keys(countsMap).length;
          let totalSumBigInt = BigInt(0);
          
          for (const numStr in countsMap) {
             const n = parseInt(numStr, 10); // Re-parse to be safe or use keys directly. Keys are strings here.
             const countVal = countsMap[numStr];
             
              try { 
                 totalSumBigInt += BigInt(n as number) * (countVal as bigint | undefined || BigInt(0));
              } catch {}
          }

           console.log(`count=${finalCount} sum=${Number(totalSumBigInt)}\n`); // Wait, if overflow possible? "sum fits in 64bit". So Number() is safe. But we used BigInt for safety. Convert back to string representation of number.
       }
    } catch (e) { 
        console.log('count=0 sum=`');
    } finally {}

} 

// Wait, the logic above has some issues with scope and variable definition order in JS/TS flow without imports. Let's rewrite cleanly inline.
