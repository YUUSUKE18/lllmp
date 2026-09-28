const memo = new Map<bigint, number>();
memo.set(1n, 0);

function getSteps(n: bigint): number {
    if (memo.has(n)) return memo.get(n)!;
    
    let steps = 0;
    let current = n;
    
    while (!memo.has(current)) {
        if (current === 1n) break; 
        
        if (current % 2n === 0n) {
            current = current / 2n;
        } else {
            current = 3n * current + 1n;
        }
        steps++;
    }
    
    const cachedSteps = memo.get(current)!;
    memo.set(n, steps + cachedSteps);
    return memo.get(n)!;
}

async function main() {
    let totalSum: bigint = 0n;
    
    for await (const line of process.stdin) {
        const trimmedLine = line.trim();
        if (trimmedLine.length === 0) continue;
        
        try {
            const nVal = BigInt(trimmedLine);
            // Spec says input is integers >= 1.
            // If invalid number format or out of range, catch block handles it.
            if (nVal < 1n) continue; 
            
            const steps = getSteps(nVal);
            totalSum += BigInt(steps);
        } catch (e) {
            // Ignore lines not interpretable as integers
        }
    }
    
    console.log(`total=${totalSum}`);
}

main();
