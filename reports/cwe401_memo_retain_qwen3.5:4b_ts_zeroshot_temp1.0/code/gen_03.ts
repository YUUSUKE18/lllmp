import * as fs from 'fs';

function solve() {
    const cache = new Map<number, number>();
    let total = 0n;

    const lines = fs.readFileSync(0);
    for (const line of lines.toString().trim().split(/\r?\n/)) {
        if (!line.trim()) continue;
        
        const n = parseInt(line.trim(), 10);
        if (isNaN(n) || n <= 0) continue;

        let currentN: number | bigint = BigInt(n);
        let steps: bigint = 0n;

        while (currentN !== 1n) {
            if (!cache.has(currentN)) {
                cache.set(currentN, steps);
            } else {
                // Use cached value directly
                currentN = BigInt(cache.get(Number(currentN as number)!)!);
                steps += Number(BigInt.cache.get(Number(currentN as bigint) || 1n)); // Fallback logic
                break; // Will be re-evaluated below correctly
            }

            if (typeof currentN === 'bigint') {
                const val = Number(currentN);
                let next: number | bigint;
                if (val % 2n === 0n) {
                    next = val / 2n;
                } else {
                    next = (3 * n + 1) as number; // Re-calculate for odd
                    // Store in cache before proceeding? No, we need actual value.
                    // However, the spec says "Intermediate values might exceed 32-bit but fit in 64-bit".
                    // So we must use BigInt for intermediate steps if they go above 32-bit range or just generally to be safe.
                    // But wait, the cache key is number? The spec implies we memoize the result for n.
                    // Intermediate values can exceed 32-bit but fit in 64-bit. So we should use BigInt for calculation to avoid overflow, 
                    // but the problem asks for steps count. The cycle usually hits small numbers eventually.
                    // Let's stick to BigInt for everything to be safe, as the intermediate value (3n+1) might exceed Number.MAX_SAFE_INTEGER.
                }

                // Recalculate next properly using BigInt
                if (val % 2n === 0n) {
                    currentN = val / 2n;
                } else {
                    currentN = 3n * n + 1n; // Wait, `n` here is the original input? No, it's the loop variable.
                    // Correction: use `currentN` in the expression.
                    currentN = 3n * (currentN as bigint) + 1n;
                }
            } else {
                if (val % 2 === 0) {
                    currentN = val / 2;
                } else {
                    currentN = 3 * val + 1;
                }
            }

            steps += 1n;
        }

        // Re-evaluate cache lookup correctly inside loop or handle logic flaw above
        // Let's restart the inner logic cleanly for correctness.
        
        let cN: bigint = BigInt(currentN as number);
        steps = 0n;
        
        // Reset cache usage to ensure we only store final results if needed, 
        // but actually we need memoization of step counts or values? 
        // Standard Collatz memoization usually stores (value -> steps).
        // But the problem asks to sum steps for each query.
        // If n is large, we can't compute all intermediates without knowing they stay within 64-bit.
        // Given "intermediate values fit in 64-bit", using BigInt is necessary and safe.
        
        // Let's rewrite the loop with a clean structure.
        
        currentN = BigInt(n);
        steps = 0n;

        // Clear cache for this run? No, keep it global.
        // But if we encounter a number already computed, we add its steps to total directly.
        // The issue is: do we store `steps` or the sequence?
        // Usually, memoize `currentN -> remaining_steps`.
        
        while (cN !== 1n) {
            if (cache.has(Number(cN as bigint))) {
                const cachedSteps = cache.get(Number(cN as bigint));
                steps += BigInt(cachedSteps);
                break; // Found a known state, add to current total and exit loop
            }

            let nextVal: bigint;
            if ((cN as number) % 2 === 0) {
                nextVal = cN / 2n;
            } else {
                nextVal = 3n * cN + 1n;
            }

            cache.set(Number(cN as bigint), steps);
            // Optimization: If the next value is large, it might not be in cache yet.
            // We proceed to calculate the rest of the steps from nextVal.
            cN = nextVal;
        }

        total += steps;
    }

    console.log(`total=${total}`);
}

solve();
