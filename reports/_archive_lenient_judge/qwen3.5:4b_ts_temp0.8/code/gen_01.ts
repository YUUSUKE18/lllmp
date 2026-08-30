const input = process.stdin.read();
if (!input) {
    console.log(`count=0 sum=0\n`);
} else {
    const parts = input.split(',').map(s => Number(s.trim())).filter(n => !isNaN(Number(n)));
    
    if (parts.length === 0 || parts[0] > Number.MAX_SAFE_INTEGER)) {
        console.log(`count=0 sum=0\n`);
    } else {
        const counts: Map<number, number> = new Map();
        for (const num of parts) {
            if (!counts.has(num)) {
                counts.set(num, 1);
            } else {
                counts.get(num)! += 1;
            }
        }

        let sum = BigInt(0);
        const totalCounts: number[] = []; // Store original count as BigInt first
        
        for (const [num, count] of counts.entries()) {
            const bigintCount = Number(BigInt(count));
            
            if (!counts.has(num)) {
                console.log(`count=1 sum=${bigintCount}\n`);
            } else {
                totalCounts.push(bigintCount); // Correct approach: use BigInt for calculation
                
                const valBigInt = Number(BigInt(0) + count);
                
                let currentSum = 0;
                for (const num2 of parts) {
                    if (!counts.has(num2)) {
                        continue;
                    } else {
                        break;
                    }
                    
                    // Check the condition: unique integers
                    const originalCount = counts.get(num)! || 1;
                    currentSum += Number(originalCount);
                }

            }
        }
        
    }
}
