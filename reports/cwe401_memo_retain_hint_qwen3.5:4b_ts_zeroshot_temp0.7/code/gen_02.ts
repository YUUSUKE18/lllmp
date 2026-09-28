const cache = new Map<number, number>();

function solve(n: number): number {
  if (n === 1) return 0;
  if (cache.has(n)) return cache.get(n)!;
  
  let steps = 0;
  let current = n;
  
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
    
    // Safety check to prevent infinite loops in case of unexpected behavior,
    // though the Collatz conjecture suggests it always terminates.
    // Using a large threshold for step count as a fail-safe.
    if (steps > 2 * 100000) {
      break; 
    }
    
    cache.set(current, steps);
  }
  
  // The steps calculated above are from n to 1.
  // We need the total steps for each query.
  // Since we memoize the result at intermediate values, we can just look up the value if it exists.
  // However, the structure of the loop calculates steps from current to 1.
  // Let's re-evaluate: The problem asks for steps until 1 is reached.
  // Example: n=6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1. Steps = 8.
  // If we memoize, say at 8, cache(8) should return steps from 8 to 1 (3).
  // Then steps(n) = steps(n->next) + 1.
  // My current loop structure computes total steps in one go but stores the result of the sub-problem.
  // Actually, the standard way is: f(n) = 1 + f(next(n)). Base case f(1)=0.
  // The loop above calculates 'steps' which is exactly what we need if we just return it.
  // But wait, the cache stores 'current' -> 'steps_so_far_from_current_to_1'? 
  // No, in the loop: when current=8, next=4, steps becomes 1 (from 8 to 4). Then 4->2, steps=2... then 2->1, steps=3.
  // So cache.set(8, 3) is correct? Let's trace:
  // n=6. current=6. next=3. steps=1. cache.set(3, 1).
  // ... eventually current=3. next=10. steps=2 (from 6 perspective? No).
  
  // Correction on the logic inside the loop for memoization:
  // If we want f(n) = total steps from n to 1.
  // We can't easily compute f(n) in one pass and store partial results like cache.set(current, steps) 
  // where 'steps' is accumulated from start unless we restructure.
  
  // Better approach: Compute recursively or iteratively storing the count for each visited state relative to that state.
  // Iterative with correct logic:
  // Let's just simulate and store the final answer for n. If we encounter a number already in cache, 
  // we can use its value? No, because the path is fixed.
  // Actually, since the sequence is deterministic and unique, we can just compute it.
  // Optimization: Memoize f(x).
  
  // Let's rewrite the solver to be cleaner for memoization.
  // We'll do a simple recursion with memoization or an iterative approach that builds up from 1? 
  // Building up from 1 is hard because we don't know the path.
  // But since we have multiple queries, maybe the paths overlap significantly (Collatz tree).
  
  // Correct Iterative Logic for f(n):
  // If n is in cache, return it.
  // Else compute next = next_val(n).
  //   If next is in cache, then f(n) = 1 + cache.get(next).
  //   Else, we need to continue. But this requires recursion or a stack/queue to resolve the dependency chain.
  // Given "64bit integer" warning, values can be large, but they come from the sequence.
  
  // Let's use a recursive helper with memoization for clarity and correctness.
  // Or iterative using a map to store 'current' -> 'distance_to_1'.
  
  // Revised Algorithm:
  // 1. If n is 1, return 0.
  // 2. If cache has n, return cache.get(n).
  // 3. Compute next_val = (n%2==0) ? n/2 : 3n+1.
  // 4. Recursively get steps for next_val.
  // 5. Store and return 1 + steps(next_val).
  
  // Since we want to avoid stack overflow for deep paths (though Collatz is generally short, some inputs are long),
  // an iterative approach that resolves the chain is safer. However, standard recursion depth limit in JS is ~1e4-1e5.
  // Max steps for 64-bit numbers is around a few thousands usually. For example, starting number < 2^31 has max steps 525 (for 8604759).
  // Wait, the problem says "values may exceed 32bit but fit in 64bit". The maximum step count for numbers fitting in 64-bit is relatively small 
  // compared to the number of bits. The max steps for n < 2^64 is around 500-1000? Actually, for n=2^64-3, it's much higher?
  // No, the maximum stopping time for inputs up to 2^64 is known to be manageable (a few thousand steps max).
  // So recursion is fine. Node.js default stack size is usually enough for a few hundred calls.
  
  return cache.get(n) ?? (cache.set(n, solve(nextVal = n % 2 === 0 ? n / 2 : 3 * n + 1) + 1));
}

// Read all input from stdin
const input = process.stdin.read().split('\n');

let totalSteps = 0;

for (const line of input) {
  const trimmed = line.trim();
  if (!trimmed) continue; // Skip empty lines
  
  try {
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) continue; // Skip non-integer lines
    
    if (n < 1) continue; // Problem says positive integers (1 or more), but safe to check.
    
    totalSteps += solve(n);
  } catch (e) {
    // Ignore lines that fail parsing
  }
}

console.log(`total=${totalSteps}`);
