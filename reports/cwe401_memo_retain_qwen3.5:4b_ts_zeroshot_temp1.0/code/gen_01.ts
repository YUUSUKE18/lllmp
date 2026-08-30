const memo = new Map<number, number>();

function countSteps(n: number): number {
    if (n === 1) return 0;
    
    let current = n;
    let steps = 0;
    
    while (current !== 1) {
        if (memo.has(current)) {
            steps += memo.get(current)!;
            break;
        }
        
        const nextVal = (current % 2 === 0) ? current / 2 : 3 * current + 1;
        current = nextVal;
        steps++;
    }
    
    if (current !== 1) {
        // This case should not happen based on Collatz conjecture for integers within safe bounds,
        // but in a strict simulation loop:
        while (current !== 1) {
            const nextVal = (current % 2 === 0) ? current / 2 : 3 * current + 1;
            steps++;
            current = nextVal;
        }
    }
    
    return steps;
}

let totalSum = 0n; // Use BigInt to prevent overflow if intermediate values exceed Number.MAX_SAFE_INTEGER

const lines = process.stdin.read().split('\n');

for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '') continue;
    
    let num: number | bigint;
    try {
        num = parseInt(trimmed, 10);
        // Validate that it's a valid integer and within reasonable bounds for Node.js Number
        if (isNaN(num) || (num > Number.MAX_SAFE_INTEGER || num < -Number.MAX_SAFE_INTEGER)) {
            continue; 
        }
    } catch {
        continue;
    }
    
    const n = num as number;
    if (n <= 0) continue; // Ensure n is a positive integer
    
    // If the sequence grows too large to fit in Number, we must switch to BigInt for safety during calculation.
    let current: bigint = BigInt(n);
    let steps: bigint = 0n;
    
    while (current !== 1n) {
        const nextVal = (Number(current) % 2 === 0) ? Number(current) / 2 : 3 * Number(current) + 1;
        
        if (nextVal > Number.MAX_SAFE_INTEGER || nextVal < -Number.MAX_SAFE_INTEGER) {
            // If the value exceeds safe range, use BigInt math directly to avoid precision loss/overflow in intermediate steps
            const newVal = (Number(current) % 2 === 0) ? Number(current) / 2 : 3 * Number(current) + 1n;
            
            if (newVal < 0n) { 
                break; // Should not happen with positive start, but safety check
            }
            
            current = newVal;
            steps++;
        } else {
            // Optimization: Check previous value in memo (if small enough) or just calculate normally if large
            // Since we are summing steps, and the sequence usually returns to smaller numbers or ends quickly.
            // We'll continue with BigInt arithmetic for all steps to ensure correctness for huge Collatz sequences.
            
            const next = (Number(current) % 2 === 0) ? Number(current) / 2 : 3 * Number(current) + 1n;
            
            if (next < 1n) break; // Safety break
            
            current = next;
            steps++;
        }
    }
    
    totalSum += steps;
}

console.log(`total=${Number(totalSum)}`);
