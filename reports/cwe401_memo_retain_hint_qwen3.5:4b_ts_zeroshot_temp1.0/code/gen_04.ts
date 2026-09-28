const memo = new Map<number, number>();
let totalSum = 0n;

function getStep(n: bigint): number {
    if (n === 1n) return 0n;
    
    // Check if n is already computed
    if (memo.has(Number(n))) {
        return memo.get(Number(n))!;
    }
    
    let current = n;
    let steps = 0n;
    
    while (true) {
        // Determine next value based on parity of current step count? 
        // No, the problem says: "replace n with n/2 if even, 3n+1 if odd" repeatedly.
        // The logic applies to the number itself, not the step count.
        
        if (current & 1n) { // Odd
            current = current * 3n + 1n;
        } else { // Even
            current = current / 2n;
        }
        
        // Use BigInt to prevent overflow before storing in Map? 
        // Actually the map key is Number, but numbers go up to 2^53 safely.
        // However the problem states "64bit integer range". JS numbers are double precision floats.
        // They can only represent integers exactly up to 2^53 - 1 (Safe Integer Range).
        // The Collatz sequence can exceed this, but we should store keys as BigInts 
        // to avoid precision loss. However the Map key must be comparable.
        // Since the problem asks for Node.js TypeScript and standard constraints,
        // and "64bit integer", let's use BigInt keys if possible?
        // But standard JSON/Map in JS works with objects/numbers.
        // We can store as string keys or ensure numbers stay within safe range 
        // OR handle the sequence carefully. The Collatz conjecture is unproven, but all tested values fit.
        // However for this problem let's just track steps and use BigInt for calculations.
        
        if (Number(current) < 2147483648n) { 
             if (memo.has(Number(current))) {
                 steps += memo.get(Number(current));
                 break; // Actually we are going to the end, not looking up? 
                     // No, wait. The algorithm is: while we haven't reached 1, perform op.
                     // So we compute next, increment steps, and repeat until n=1.
             } else {
                // Since we are computing a new number 'current' from 'n', we can check memo for it.
                // But the problem says: replace n -> ... repeatedly until 1 is reached.
                // So when next step hits a known number (not necessarily 1), we can use its value.
                if (memo.has(Number(current))) {
                    steps = steps + Number(memo.get(Number(current)));
                    break; 
                }
             }
        } else {
            // For large numbers beyond safe integer range, we might need to be careful with keys.
            // But actually the sequence always converges to 1 for tested numbers.
            // We'll use a string key or just store in BigInt Map (not native). Let's store in BigInt Map.
             if (!memo.has(current as number)) {
                memo.set(Number(current), 0n); // placeholder? Actually we compute steps inside loop.
             }
        }
    }
    
    return totalSum;
}

function solve(): void {
    let line: string | null;
    while ((line = process.stdin.read()) !== null) {
        if (line.length === 0 || line.trim() === "") continue; // Ignore empty lines
        
        for (const token of line.split(/[\s\n]+/)) {
            const n = BigInt(token);
            let current = n;
            let steps = 0n;
            
            while (current !== 1n) {
                if (current % 2n === 0n) {
                    current = current / 2n;
                } else {
                    current = current * 3n + 1n;
                }
                steps += 1n;
            }
            
            // Check memoization
            if (memo.has(Number(current))) {
                steps = steps + memo.get(Number(current));
            } else {
                 // Since current is always 1 at end of loop, we check memo for intermediate? 
                 // Actually the memo strategy here: compute first step, store it if useful?
                 // But the standard approach: cache results of f(x) = steps to 1.
                 // Let's restart logic properly inside main to allow caching.
            }
        }
    }
}

// ... Actually implementing the memoization correctly requires restructuring logic 
// to look up known values before recursing (simulated).
