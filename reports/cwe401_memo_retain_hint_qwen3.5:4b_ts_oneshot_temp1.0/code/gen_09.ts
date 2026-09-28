```ts
const cache = new Map<number, number>();
let totalSum = 0n;

process.stdin.on("data", (chunk: Buffer) => {
  const lines = chunk.toString("utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const nStr = line.trim();
    const n = parseInt(nStr, 10);
    if (Number.isNaN(n)) continue;

    let current: number = n;
    let count: bigint = 0n;

    while (current !== 1) {
      if (!cache.has(current)) {
        const nextVal = isEven(current) ? current / 2 : 3 * current + 1;
        cache.set(nextVal, BigInt(count + 1));
      }

      // Ensure we use the memoized result if available for the next step
      // Note: The problem requires computing the total steps for all queries.
      // Memoization should be applied globally.
      
      // However, since we are calculating from n down to 1 (or rather n -> ... -> 1),
      // and the chain eventually hits smaller numbers, we need a way to retrieve results.
      // But here we are processing multiple queries independently.
      // To optimize efficiently, we can precompute or compute on demand.
      // Since input is small per query but potentially many queries, on-demand caching works.
      
      // But wait, the chain goes up (e.g., 3n+1) then down. So smaller numbers might have been computed already?
      // Yes, if a number > current was seen before in a previous query or in the current chain.
      // Actually, we should always check both directions if possible, but here:
      // We start at n and go until 1. The values can grow large.
      // We should cache when we encounter a new value on our path.

      const prev = isEven(current) ? current / 2 : 3 * current + 1;
      
      // We'll do iterative computation with memoization as we go, storing the count needed for each number encountered.
      // But since we can't predict which numbers will be visited in future queries without full traversal,
      // and since we process one query at a time, we should update cache whenever we see a value we haven't seen yet?
      // Actually, it's simpler: just compute n -> ... -> 1. On the way, if any number has been cached, use it to skip steps.
      
      // We need to restructure this: instead of storing count at each step in an array or object,
      // we can store "steps from x to 1" in the cache.
      
      // Let's implement a helper function that computes steps for a number using existing cache.
      
      // Actually, let's use a Map where key is number and value is remaining steps.
      // We can't easily update the cache on-the-fly in the middle of a query without recomputing.
      // A better approach: compute full path for current n, updating cache as we find new numbers?
      // But that's not straightforward because we might need to jump back to already-cached values.
      
      // Alternative: Just run Collatz sequence forward while caching intermediate results when they're first encountered.
      // Then look up the end of the chain from 1 upwards if possible?
      // No, standard practice for multiple queries: compute on demand and memoize the final result (steps to 1).
      
      // Since this is a stream, we will do:
      // Step 1: If n in cache, add result to totalSum and skip.
      // Step 2: Else simulate sequence until we hit a cached value or reach 1.
      //        As we simulate, store the steps for each new number encountered (from current down to that next node).
      
      const computedSteps = computeStepsWithCache(current);
      if (!computedSteps) {
        totalSum += BigInt(computeCollatzStepByStep(n));
      }
    }
  }
});

function isEven(x: number): boolean {
  return x % 2 === 0;
}

function computeStepsWithCache(n: number): number | null {
  // If already computed, just retrieve it
  if (cache.has(n)) {
    return cache.get(n);
  }
  return null;
}

// However, we must be careful about how the cache works since it's being built dynamically.
// We'll use a simpler strategy:
// When processing n:
//   If cache has n -> return steps stored.
//   Else:
//      Start from n, generate next numbers until 1 or until we hit a known number (in cache).
//      For each new number x encountered that is not in cache, compute how many steps needed to get to it? 
//      Or better: compute steps from x to the next cached point.

let tempMap = new Map<number, number>(); // temporary map during one query

function solve(n: number): number {
  if (n === 1) return 0;
  const cacheKey = String(n);
  if (cache.has(Number(cacheKey))) {
    const steps = cache.get(Number(cacheKey));
    totalSum += BigInt(steps);
    return steps;
  }

  // Temporarily store computed segments
  let currentSteps: number = 0;
  let curr = n;
  const visitedSet = new Set<number>();

  // We'll simulate and build a mini-map for this sequence to avoid recomputing large chains
  while (curr !== 1 && !tempMap.has(curr) && !cache.has(curr)) {
    if (isEven(curr)) {
      nextVal = curr / 2;
    } else {
      nextVal = 3 * curr + 1;
    }

    tempMap.set(curr, currentSteps); // Actually no, this isn't right.

    // Let's rethink: We'll compute steps from curr to the next number we already know (either in cache or visited earlier)
  }
  
  // Actually, here's a working approach:
  // Since we are allowed to use 64-bit integers for values but totalSteps must be accumulated safely.
  // But intermediate numbers fit in 64-bit signed int? Yes per problem statement.
  
  // We'll do iterative simulation with caching as we go, but only caching the final step count from each node to 1.
  // To make it fast for multiple queries:
  // For each query n:
  //   Let s(n) be steps from n to 1.
  //   If cache has s(n), return it.
  //   Else:
  //      Run the sequence until we hit a value m such that s(m) is known (either in cache or visited earlier).
  //      Then s(n) = (number of steps taken) + s(m).
  //      Store the step counts for each intermediate node encountered? 
  //      Actually, if we hit an already-visited node in current chain, we can stop and back-propagate.
      
  const knownStepsMap = new Map<number, number>(); // Maps number -> steps to 1 (either cached or computed)
  
  while (curr !== 1 && !knownStepsMap.has(curr) && !cache.has(curr)) {
    const nextVal = isEven(curr) ? curr / 2 : 3 * curr + 1;
    
    if (nextVal === 1) {
      knownStepsMap.set(1, 0); // Base case
      break;
    } else if (knownStepsMap.has(nextVal)) {
      // If we hit a known value, we can backtrack and compute steps for current path
      let steps = 0;
      let lastKnownNode = nextVal;
      while (!cache.has(curr) && !tempMap.has(curr)) {
        const nextNextVal = isEven(curr) ? curr / 2 : 3 * curr + 1;
        steps += 1;
        if (nextNextVal === lastKnownNode) break;
        tempMap.set(curr, steps); // Temporary cache for backtracking
        curr = nextNextVal;
      }
      
      // If we hit a known value during backtracking, compute s(curr)
      // Actually simpler: just accumulate from current to the known node
      
      // We need to restructure this logic cleanly.

    }
    
    tempMap.set(nextVal, steps + 1); // Temporarily store that nextVal takes steps+1 to reach known? No.
    
    // Let's try a different way: precompute everything as we go in the current chain, 
    // storing for each new node encountered its step count to the first known node.
    
    curr = nextVal;
  }

  // This approach is too complex for dynamic updates. Let's use a simpler and robust method:
  // Always simulate from n until we hit either 1 or a number whose steps are already in global cache.
  // During simulation, if we encounter a number not in cache, remember its position? No, just continue.
  // If we hit a number that's been seen earlier in the current chain (cycle detection), stop there.
  
  const visitedInChain = new Set<number>();

  let steps = 0;
  while (curr !== 1 && !cache.has(curr) && !visitedInChain.has(curr)) {
    if (isEven(curr)) {
      nextVal = curr / 2;
    } else {
      nextVal = 3 * curr + 1;
    }

    steps += 1;
    
    // If we hit a number that was computed earlier in this chain, stop and backtrack
    if (visitedInChain.has(nextVal)) {
      break;
    }
    
    tempMap.set(nextVal, steps); // Temporarily store steps from nextVal to the known point? No.
    
    // Actually, let's store how many steps it takes from curr to hit a known node.
    // But we need s(curr) = steps_from_curr_to_known + s(known_node).
    
    curr = nextVal;
  }

  // Now backtrack to compute s(n) and update temporary cache
  if (curr === 1) {
    while (!cache.has(1)) {
      tempMap.set(curr, steps); // Not quite right.
      // Better: compute from bottom up when we hit a known node.
      break;
    }
  }

  return 0;
}

// Let's simplify and implement correctly in main loop:

process.stdin.on("data", (chunk: Buffer) => {
  const lines = chunk.toString("utf8").split(/\r?\n/);
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const nStr = line.trim();
    const n = parseInt(nStr, 10);
    
    if (Number.isNaN(n)) continue;

    let totalStepsForN = 0n;
    
    // If n is in cache, use it
    if (cache.has(Number(String(n)))) {
      totalSum += cache.get(Number(String(n)));
      continue;
    }
    
    const visitedInChain = new Set<number>();
    let currentVal = Number(String(n));
    let stepsCount = 0;

    // Simulate forward until we hit 1 or a known value
    while (currentVal !== 1 && !cache.has(currentVal) && !visitedInChain.has(currentVal)) {
      const nextVal = isEven(currentVal) ? currentVal / 2 : 3 * currentVal + 1;
      
      stepsCount += 1;
      visitedInChain.add(nextVal);

      if (cache.has(Number(String(nextVal))) || visitedInChain.has(nextVal)) {
        break;
      }
      
      // If we see a value that appears again in this chain, we stop and backtrack
      // But actually, we should only add to cache if we finish computing its steps.
      // So we need to compute the entire segment from nextVal down to the known node, then store for each number in it.
      
      // For now, let's just simulate and when we hit a known value (in cache or visited), 
      // backtrack and fill the cache with step counts from each intermediate node to that known value.
    }

    // Backtrack to compute step counts for numbers encountered in this query
    if (cache.has(Number(String(currentVal)))) {
      // Found a known end point, now backtrack from currentVal to n
      let stepsBack = 0;
      let currVal = Number(String(n)); // Start from where we stopped
      
      // We need to reconstruct the path: store path during forward simulation?
      // Alternatively, since values can be large, but chain length is short (Stoll conjecture), 
      // we can just run backwards from currentVal to n if we stored the path.

    } else {
      // Reached 1
      totalStepsForN = stepsCount;
    }

    // After getting s(n), add to totalSum and store in cache
    cache.set(Number(String(n)), totalStepsForN);
    totalSum += totalStepsForN;
  }
});

// Wait, the above logic is incomplete because we don't compute intermediate step counts properly.
// Let's rewrite with a clear forward-backward approach:

const memo = new Map<number, number>(); // Key: n, Value: steps to reach 1

function solve(n: number): number {
  if (n === 0) return 0; // Should not happen per spec
  
  const key = String(n);
  if (memo.has(Number(key))) {
    return memo.get(Number(key));
  }

  let currentVal = n;
  let steps = 0;
  const path: number[] = [];

  while (currentVal !== 1 && !cache.has(currentVal)) {
    // Check if this value is already visited in a previous query? No, cache covers all.
    
    // But we might hit a value that we are currently traversing -> cycle detection
    // However, Collatz sequences don't have cycles except for 4->2->1... 
    // So we just simulate until we hit 1 or a cached value.

    const nextVal = isEven(currentVal) ? currentVal / 2 : 3 * currentVal + 1;
    steps += 1;
    path.push(currentVal);
    currentVal = nextVal;

    if (cache.has(Number(String(currentVal))) || nextVal === 1) {
      // We can break and compute steps for the entire chain from start of chain to known end
      break;
    }
  }

  // Now, if we broke because we hit a cached value or 1,
  // let's backtrack and assign step counts to each node in path.
  
  if (cache.has(Number(String(currentVal)))) {
    const knownSteps = cache.get(Number(String(currentVal)))!;
    
    // Assign from end of chain (currentVal) backwards to n
    for (let i = path.length - 1; i >= 0; i--) {
      const nodeValue = path[i];
      const stepsNeeded = i + 1;
      cache.set(nodeValue, knownSteps + BigInt(stepsNeeded));
    }
  } else if (currentVal === 1) {
    // We reached 1, so all nodes in path need their step count updated
    for (let i = path.length - 1; i >= 0; i--) {
      const nodeValue = path[i];
      cache.set(nodeValue, BigInt(i + 1));
    }
  }

  return memo.get(Number(String(n))); // Not yet filled if n not in cache? Wait.
}

// Final correct implementation using iterative simulation with full caching:

const globalCache = new Map<number, number>(); // Maps number -> steps to reach 1

function getSteps(n: number): number {
  const key = String(n);
  
  if (
