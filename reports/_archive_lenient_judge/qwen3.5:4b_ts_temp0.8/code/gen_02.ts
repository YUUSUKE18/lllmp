const input = process.stdin.read();
const parts = input.split(',').map(s => {
    const trimmed = s.trim();
    if (trimmed === '') return;
    const num = parseInt(trimmed, 10);
    if (!Number.isFinite(num)) return;
    return Number.isInteger(num) ? num : null;
});

const validNumbers: number[] | undefined = parts.filter(Boolean).map(n => n as unknown as number);
if (validNumbers === undefined || validNumbers.length < 1) {
    console.log(`count=0 sum=`);
} else {
    const uniqueSet = new Set<number>();
    for (const num of validNumbers) {
        if (!uniqueSet.has(num)) {
            uniqueSet.add(num);
            let count = 1;
            // Count duplicates to determine final occurrence in the original array? No, re-read spec: "重複を除いた整数"について. This usually means distinct integers found across all inputs. Wait, does it mean sum/count of each *unique* number individually summed up? Or just one single line for ALL unique numbers combined?
            // Re-reading strictly: "それらのうち『重複を除いた整数』について、個数と合計を求めます" (Find the count and total of [integers that are duplicates removed]). This implies we treat the set of distinct integers. For example, input 1,2,2,3 -> unique ints are {1,2,3}. The question is: do I calculate "count=3 sum=6"? Or do I iterate each number?
            // Given standard CP problem interpretation where you output a single line for the whole set of distinct values provided in input.
        }
    }
    
    const uniqueNumbers = Array.from(uniqueSet);
    let totalSum: bigint | undefined; 
    if (uniqueNumbers.length > 0) {
        // Use BigInt to ensure safety, though spec says fits in 64bit int, intermediate might be safer but result is guaranteed.
        // However, simple number addition works for standard JS numbers up to safe integer limit (2^53). 
        // Spec guarantees final sum fits in 64-bit signed integer range (-9e18 to +9e18), so regular Number should suffice if we handle carefully or use BigInt intermediate.
        let bigSum = 0n;
        for (const n of uniqueNumbers) {
            bigSum += BigInt(n);
        }
        
        const countStr = `count=${uniqueNumbers.length}`;
        // Format sum as string to avoid formatting issues and ensure correct output type representation. 
        // But wait, is there ambiguity on what "total" means? If input has [1, 2, 2], unique are {1, 2}. Count of unique integers = 2. Sum of those unique integers = 3 (not including duplicates).
        // Yes, that is the only logical interpretation for a single line output without grouping keys.
        
        console.log(`${countStr} sum=${bigSum.toString()}`);
    } else {
        console.log(`count=0 sum=`);
    }
}

// Wait, re-evaluating my previous loop logic vs Set logic above. The code block below implements this correctly now.
