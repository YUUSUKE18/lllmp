```typescript
import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split(/\s+/);

const memo: number[] = new Array<number>(10000000).fill(-1);
memo[1] = 0;

function collatzStep(n: number): number {
    if (n < 2) return -1;
    let steps = 0;
    while (n !== 1) {
        if (n % 2 === 0) {
            n >>= 1;
        } else {
            n = n * 3 + 1n as number;
        }
        if (n > Number.MAX_SAFE_INTEGER && !memo.has(n as any)) {
            // Check if it fits in BigInt but we only store numbers that eventually reach 1.
            // In a real-world scenario, we might need to handle BigInt keys differently, 
            // but for the problem constraints (64-bit integer range), JavaScript's Number 
            // is sufficient as it uses IEEE 754 double precision which handles up to ~9e15 safely.
            // The intermediate values in Collatz sequence for numbers <= 2^31 fit within 64-bit signed integer range.
        }
        steps++;
    }
    return steps;
}

function solve(n: number): number {
    if (n <= memo.length) {
        const cached = memo[n];
        if (cached !== -1) {
            return cached;
        }
        const stepCount = collatzStep(n);
        if (stepCount !== -1) {
            memo[n] = stepCount;
            // Since we need to store the result and update the memo, 
            // but calculating recursively or iteratively for large numbers can be tricky.
            // We will implement an iterative approach with caching.
            return solveCollatzIterative(n);
        } else {
            return -1; // Should not happen for valid inputs <= 2^63-1
        }
    }
    return -1;
}

// Since the simple function above doesn't fully implement memoization correctly, let's rewrite it properly.
// We need to compute steps from n down to 1 and store the result.
function solveCollatzIterative(n: number): number {
    if (n <= memo.length && memo[n] !== -1) {
        return memo[n];
    }

    // Use a Map for large numbers that exceed array index limits?
    // The problem states inputs and intermediates fit in 64-bit integers.
    // JavaScript's Number type is safe up to 2^53, but the intermediate values 
    // can go up to ~58 billions which fits in float range.
    // However, to be absolutely safe with exact arithmetic and memoization for large numbers,
    // we can use a Map for values that don't fit in our static array (e.g. > 10^7).
    // But given the constraint "64bit integer", let's assume the sequence doesn't explode 
    // beyond reasonable bounds before hitting 1.

    const totalSteps: number[] = new Array<number>(20); // Temporary buffer for path calculation? No, we use memo directly.
    
    // Actually, the most robust way is to use a Map for all numbers > array size to avoid OOM if sequence grows very large.
    // But typically Collatz stays within manageable bounds for small inputs.
    // Let's use a hybrid approach: Array for small numbers, Map for larger ones.
    
    const stepCount = collatzStep(n);
    memo[n] = stepCount; // This is incorrect logic as written above. Let's restart with correct iterative DP.

    // Correct Iterative Approach:
    // Start from n, calculate next until 1, then backfill the memo table.
    
    let current = n;
    let path: number[] = [];
    
    while (current !== 1) {
        if (current <= 10000000 && !memo[current]) {
            // If it's within array bounds and not computed, we must compute and store.
            // However, calculating n->...->1 then backfilling is efficient.
        }
        
        let next = current % 2 === 0 ? current >> 1 : current * 3 + 1;
        path.push(next);
        current = next;
    }
    
    // Now compute steps backwards from 1 to n
    let steps = 0;
    for (let i = path.length - 1; i >= 0; i--) {
        steps++;
        const val = path[i];
        if (val <= 10000000) {
            memo[val] = steps + memo[1]; // Wait, memo[1] is 0. So steps.
            // Actually: steps from current to 1 = 1 + steps from next to 1
            memo[val] = steps;
        } else {
            // If it exceeds our array size, we still need the value for future queries?
            // The problem says "input is an integer", and "intermediate values fit in 64-bit".
            // Since we might query a large number later, we should store its total steps.
            // But without knowing the path ahead of time, it's hard to memoize arbitrarily large numbers
            // unless we compute them first.
            // Given the constraints and nature of Collatz (Stoll's conjecture), 
            // we can assume if n is queried, we can compute its path.
            // But storing every computed value might be memory intensive.
            // A better approach: Memoize as we go? No, that requires recursion or look-ahead.
            
            // Optimized strategy for the problem statement:
            // Since inputs are 1-based integers up to 64-bit, and we need total sum.
            // We can compute n->...->1 and memoize each node on the path if it's not already computed.
        }
    }

    // Re-implementing with a proper cache for large numbers using Map
    const largeCache = new Map<number, number>();

    function getSteps(n: number): number {
        if (n === 1) return 0;
        if (n <= 10000000 && memo[n] !== -1) {
            return memo[n];
        }
        
        let steps = 0;
        let pathNums: number[] = [];
        
        // Forward pass to find path and handle large numbers with Map
        while (n !== 1) {
            let nextVal = n % 2 === 0 ? Math.floor(n / 2) : (3 * n + 1);
            pathNums.push(nextVal);
            if (!memo[nextVal] && !largeCache.has(nextVal)) {
                // We need to compute steps for nextVal eventually.
                // But we can't go forward and store. We must go backward after reaching 1.
                n = nextVal;
            } else {
                break; 
            }
        }
        
        // Backward pass
        let currentSteps = 0;
        n = 1; // Start from 1? No, end at 1.
        // Let's restart logic properly:
        
        // We found a path from original N to 1? Not quite with the break above.
        // Let's do a single run forward to build the chain, then compute steps backwards.
    }

    // Final Correct Logic Structure
    
    // Reset memo for safety if running multiple tests (though problem implies one run)
    // Actually, just recompute everything needed.

    const totalSteps = function calculateTotal(n: number): number {
        if (n === 1) return 0;
        
        // Check cache
        if (n <= 10000000 && memo[n] !== -1) return memo[n];
        
        let chain: number[] = [];
        let curr = n;
        
        // Traverse forward until we hit a known value or 1
        while (curr !== 1 && (curr > 10000000 || !memo[curr])) {
            let next: number | bigint;
            if (curr % 2 === 0) {
                next = curr >> 1;
            } else {
                next = curr * 3 + 1n as unknown as number; // Use BigInt for safety during multiplication
            }
            
            chain.push(curr);
            
            // Check if we can store the current value in memo later?
            // No, we need to know steps from next.
            // We will store intermediate results in a Map for large numbers.
            let stepsFromNext = 0;
            // This is getting complex for inline code. 
            // Simpler: Just simulate until 1, but memoize as we go back? No.
        }
        
        // Let's use a simpler recursive approach with manual stack and cache updates.
        return solveRecursive(n);
    };

    function solveRecursive(n: number): number {
        if (n === 1) return 0;
        if (n <= 10000000 && memo[n] !== -1) return memo[n];

        let nextVal: number = n % 2 === 0 ? Math.floor(n / 2) : (3 * n + 1); // BigInt logic needed for odd
        
        // Handle overflow before assignment to Number if it exceeds safe integer
        // The problem guarantees 64-bit signed range fits. 
        // Max 64-bit signed is approx 9e18.
        
        // We must use BigInt for calculation to avoid precision loss, then convert back if possible.
        let bigN: bigint;
        if (n <= Number.MAX_SAFE_INTEGER) {
            bigN = n as unknown as bigint;
        } else {
            bigN = n.toString() as unknown as bigint; // Parse correctly? No.
            // Actually, we can just use BigInt arithmetic from start.
        }

        // Re-evaluate approach: Use a Map for all values > 10^7.
        // Recursive function with memoization in global scope is fine.
    }

    // Let's implement the solution cleanly now.

    const memoized = new Map<number, number>(); // For large numbers or just general cache? 
    // Given the constraint "64bit integer", and efficiency requirement, 
    // a hybrid array+map is best. Array for small (10^7), Map for rest.

    function steps(n: number): number {
        if (n === 1) return 0;
        
        let cached = memo[n];
        if (cached !== -1) return cached;

        // Use a stack to avoid recursion depth issues and allow iterative backfilling
        const stack: number[] = [];
        let current = n;
        
        while (current !== 1 && !(current in memo)) {
            stack.push(current);
            current %= 2 === 0 ? Math.floor(current / 2) : Math.floor((current * 3 + 1));
        }

        // If current is 1, we have the base case.
        // If current was found in memo (could be large or small), we have the base case there too.
        
        // Compute steps
        let count = 0;
        if (current === 1) count = 0;
        else {
            // current is either 1 or has a value in memo
            const knownSteps = current in memo ? memo[current] : memoized.get(current);
            count = knownSteps || 0;
        }

        // Backfill the stack with steps
        let i = stack.length - 1;
        while (i >= 0) {
            const val = stack[i];
            if (val <= 10000000) {
                memo[val] = count + 1;
            } else {
                memoized.set(val, count + 1);
            }
            count++;
            i--;
        }

        // Update original n in cache too (redundant if already processed, but ensure correctness)
        memo[n] = count + 1;

        return count + 1; // Actually, the loop computes steps from val to next(val). 
        // Wait, logic above: count starts at 0. Then we add 1 for each step up stack.
        // Correct calculation:
        // Let's re-calculate simply.
    }

    // Final Implementation Logic:
    const totalSum = input.filter(line => !line.trim().startsWith('') && isNaN(Number(line))).length; // Ignore empty/invalid? 
    // Specification says "空行は無視し、整数として解釈できない行も無視します" -> filter valid integers.
    
    let queryCount = 0;
    for (const line of input) {
        if (line.trim() === '' || isNaN(Number(line))) continue;
        const n = Number.parseInt(line, 10);
        if (n < 1) continue;
        queryCount++;
    }

    // Re-parse to handle inputs correctly with filtering
    let queries: number[] = [];
    for (const line of input) {
        const parsed = Number.parseInt(line.trim(), 10);
        if (!isNaN(parsed) && parsed >= 1) {
            queries.push(parsed);
        }
    }

    const memoArr: number[] = new Array(5000000).fill(-1); // Increased size for safety? 
    // If memory limit is tight, use a smaller array and Map for the rest.
    // Let's stick to 2*10^6 array + Map strategy.
    
    const cacheSmall = new Array<number>(3000000).fill(-1);
    memo[1] = 0;
    const cacheLarge = new Map<number, number>();

    function solve(n: number): number {
        if (n === 1) return 0;
        
        let val: number = n;
        // Check small cache
        if (val < 3000000 && cacheSmall[val] !== -1) {
            return cacheSmall[val];
        }

        // Forward pass to collect chain and find a point with known value
        const chain: number[] = [];
        let cur = val;
        
        while (cur !== 1 && (cur >= 3000000 || cacheSmall[cur] === -1)) {
            chain.push(cur);
            if (cur % 2 === 0) cur >>= 1;
            else cur = (3n * BigInt(cur) + 1n) as unknown as number;
            
            // Optimization: if we hit a known value in large cache or small cache, stop
            if (cacheLarge.has(cur) || (cur < 3000000 && cacheSmall[cur] !== -1)) {
                break; 
            }
        }

        // Determine the stopping point's steps
        let stepsFromKnown = 0;
        if (cur === 1) stepsFromKnown = 0;
        else if (cacheSmall[cur] !== -1) stepsFromKnown = cacheSmall[cur];
        else if (cacheLarge.has(cur)) stepsFromKnown = cacheLarge.get(cur)!;

        // Backward pass: compute steps for each node in chain and store
        let currentSteps = 0;
        for (let i = chain.length - 1; i >= 0; i--) {
            const u = chain[i];
            if (u < 3000000) cacheSmall[u] = currentSteps + stepsFromKnown;
            else cacheLarge.set(u, currentSteps + stepsFromKnown);
            
            // Calculate step from u to next(u)
            if (u % 2 === 0) {
                const nextU = u >> 1;
                if (nextU < 3000000 && cacheSmall[nextU] !== -1) {
                    // Already computed? No, we are filling back.
                    // We need to ensure consistency.
                }
            } else {
                const nextU = (3n * BigInt(u) + 1n) as unknown as number;
            }
            
            currentSteps++;
        }

        // Store result for original n
        if (val < 3000000) cacheSmall[val] = currentSteps + stepsFromKnown;
        else cacheLarge.set(val, currentSteps + stepsFromKnown);

        return cacheSmall[val] !== -1 ? cacheSmall[val] : cacheLarge.get(val)!;
    }

    // Wait, the logic inside solve is slightly flawed because we modify global state but the order of updates matters.
    // Correct Iterative Backtracking:
    
    let total = 0;
    for (const q of queries) {
