const input = process.stdin.read().trim();
if (!input) {
    console.log(`count=0 sum=`);
} else {
    const nums = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (nums.length === 0 || isNaN(nums[0])) {
        console.log(`count=0 sum=`);
    } else {
        const counts: Record<number, number> = {};
        let totalSum: bigint = BigInt(0n);

        for (const n of nums) {
            if (!counts.hasOwnProperty(n)) {
                counts[n] = 1;
                // Check overflow before adding to sum (though unlikely given constraints usually imply valid inputs within range, being safe is good practice in strict environments). 
                // However, the spec says "Total fits in 64-bit integer", so we can safely use BigInt for accumulation and then format.
            } else {
                counts[n]++;
            }
            
            const bigN = BigInt(n);
            totalSum += bigN;
        }

        let countStr = Object.keys(counts).length.toString();
        
        // Convert sum back to string safely since it fits in 64-bit integer. 
        // We use the same logic used for reading input but accumulate into a number if possible, or convert BigInt directly.
        const finalSum: bigint = totalSum; 
        
        console.log(`count=${countStr} sum=`);
    }
}

// Re-evaluating based on strict output requirement and potential edge cases in my thought process above (the initial loop logic was slightly redundant). 
// Let's rewrite cleanly.

const input = process.stdin.read().trim();
if (!input) {
    console.log(`count=0 sum=`);
} else {
    const nums: number[] = [];
    
    // Parse integers, ignoring non-integers and whitespace
    for (const part of input.split(',')) {
        const n = parseInt(part.trim(), 10);
        if (!isNaN(n) && isFinite(n)) {
            nums.push(n);
        }
    }

    if (nums.length === 0 || isNaN(nums[0])) { // Check again for safety
         console.log(`count=0 sum=`);
    } else {
        const counts: Record<number, number> = {};
        
        let totalSumNumber: bigint = BigInt(0n);

        for (const n of nums) {
            if (!counts.hasOwnProperty(n)) {
                counts[n] = 1;
            } else {
                counts[n]++;
            }
            
            const bigN = BigInt(n);
            totalSumNumber += bigN;
        }

        // Since the spec guarantees sum fits in 64-bit integer, we can convert back to string. 
        // However, using .toString() on a number is safer if we trust it fits within JS Number limits (which go up to ~9e15 for safe integers).
        // The prompt says "fits in 64bit signed integer", which might exceed JavaScript's safe integer limit slightly depending on interpretation of the range (-2^53 vs -2^63), 
        // but BigInt is safer. We will use .toString() on the number if we cast, or just convert bigint directly since JS supports it now?
        // Actually, converting a 64-bit int that exceeds Number.MAX_SAFE_INTEGER to string requires careful handling in older TS/JS environments without native BigInt support (but Node.js has it).
        
        let sumStr = totalSumNumber.toString();

        console.log(`count=${Object.keys(counts).length} sum=`);
    }
}
