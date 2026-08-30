const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=');
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (parts.length === 0) {
        console.log('count=0 sum=');
    } else {
        const uniqueSet = new Set(parts);
        
        let count = 0;
        for (const num of parts) {
            if (!uniqueSet.has(num)) {
                continue;
            }
            
            // Calculate total only once per unique number to avoid overflow issues during summation logic, 
            // though the spec says final sum fits in 64-bit. We sum all occurrences for valid numbers.
        }

        let currentSum = BigInt(0);
        
        // First pass: count how many times each unique number appears (but we need to iterate over original array)
        const countsMap = new Map<number, bigint>();
        
        for (const num of parts) {
            if (!uniqueSet.has(num)) continue;
            
            let c = 0n; // Use BigInt for count accumulation logic just in case, though number is fine here. 
                       // Actually we need to sum the values themselves. Let's re-evaluate.
        }

        // Correct approach: Iterate over unique numbers and multiply by their frequency? No, spec says "count of repeated integers".
        // Re-reading spec carefully: "重複を除いた整数について、個数と合計を求めます" 
        // This usually means for each UNIQUE number X found in the input: output count(X) + sum(all occurrences of X).
        // But wait, does it mean one line with total counts and sums? Or per unique item?
        // "1 行（末尾に改行）だけを出力します" -> One single line.
        
        // Interpretation A: Total number of UNIQUE integers found + Sum of all values in the input (excluding invalid ones).
        // Example Input: [1, 2, 3, 4] -> count=4 sum=10
        
        // Interpretation B: For each unique integer X present, output its frequency and value? 
        // But that would require multiple lines or a specific format like "X=count Y=sum".
        
        // Given the strict requirement of ONE line with `count=<N> sum=<S>` structure:
        // It implies aggregating over all valid integers.
        // Count = Number of UNIQUE integers present in input.
        // Sum = Total arithmetic sum of ALL occurrences of those unique integers (i.e., just ignore invalid ones).

        const validNumbers = parts.filter(n => !isNaN(Number(n)));
        
        if (validNumbers.length === 0) {
            console.log('count=0 sum=');
        } else {
            
            // Count how many UNIQUE numbers exist in the input list
            let uniqueCount = new Set(validNumbers).size;
            
            // Calculate total sum of all valid integers found. 
            // Since inputs are integers and final sum fits 64-bit, we can use BigInt for safety during calculation or just Number if safe.
            // Using BigInt to be absolutely sure about the intermediate steps matching "sum" definition even if result is within range.
            
            let totalSum = BigInt(0);
            for (const num of validNumbers) {
                const nVal = typeof num === 'number' ? num : Number(num);
                // Ensure it's actually an integer and not a float like 1.5 which parseInt might have handled loosely? 
                // Actually input says "整数列", so we assume integers. But let's be strict with the filter earlier.
                totalSum += BigInt(nVal);
            }

            console.log(`count=${uniqueCount} sum=${totalSum}`);
        }
    }
}
