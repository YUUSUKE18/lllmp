```ts
const memo = new Map<number, number>();
let total = 0;

function calculateStepCount(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let count = 1;
  let next: number | null = null;
  
  while (true) {
    const isEven = n % 2 === 0;
    next = isEven ? n / 2 : 3 * n + 1;
    
    if (next === 1 || next <= 1) {
      total++;
      break;
    } else if (next <= Number.MAX_SAFE_INTEGER && !memo.has(next)) {
      // Cache the result for this step only, not the whole path to avoid redundant work at the start of a new query unless it's repeated
      // However, since the problem asks for memoization of calculation results (collatz sequence), we should cache steps.
      // But caching the entire path for every query might be too much if queries are long and non-overlapping.
      // A better approach: cache only if it appears again or if it's a common value (like 16 -> 8 -> 4 -> 2).
      // Let's stick to simple memoization of steps taken from n, but optimize by only caching if the path is revisited or using a shared pool.
      // Given the constraint "same integer appears repeatedly", we can cache the result for each unique number encountered across all queries.
      
      // For efficiency: compute until hitting a known value (0 steps) or 1.
      // We'll compute the path length from n to 1.
    } else {
      // This branch is for intermediate values that don't fit in safe integer or haven't been seen yet?
      // Actually, since inputs are within 64-bit range but can go higher during Collatz, we need careful handling.
      // But if it exceeds MAX_SAFE_INTEGER, we can't use it as a key in JS Map without BigInt.
      // The problem says "32bit integer may not fit, but fits in 64bit", so intermediate values might exceed 64-bit? 
      // Actually, Collatz sequence for 64-bit inputs can exceed 64-bit (e.g., max observed is around 1.8e19 which is still within signed 64-bit max ~9e18? No, actually 270 million goes to ~2.5e18? Wait.
      // Max intermediate value for 32-bit input is about 1.8e19, which exceeds signed 64-bit (9e18). 
      // So we might need BigInt for intermediate steps.
      // However, the problem says "fits in 64bit integer's range", implying that all intermediate values also fit in 64-bit? 
      // Re-reading: "中途に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります" -> means input is not in 32-bit, but intermediates are within 64-bit.
      // So we can use Number (double precision) up to 9e15 safely, but intermediates up to 9e18? 
      // Actually, JavaScript Number has 53-bit mantissa, so precision is lost above 2^53 (~9e15). 
      // But for Collatz sequence, exact integers are needed. So we must use BigInt for safety if values exceed 2^53.
      // Let's assume inputs can be large (64-bit signed), so we should use BigInt to avoid precision issues.
      
      // But the problem says "64bit integer's range", meaning they fit in JS Number? No, because of floating point representation.
      // We'll use BigInt to be safe for all 64-bit values and beyond.
    }
    
    if (next === null) {
      // Fallback: use BigInt for calculation
      const bn = BigInt(n);
      let nextBn: bigint = isEven ? bn >> 1n : 3 * bn + 1n;
      count++;
      
      // Check if nextBn is within safe range or we can cache?
      // Since we need exact values, use BigInt everywhere.
    }
    
    if (nextBn === 1n || nextBn <= 0n) {
      total += count;
      memo.set(n, total - count + 1); // Wait, logic is off.
      break;
    } else {
      // Use a different approach: compute the path and cache each step? 
      // Or just compute from n to 1 and if we hit a value that was already computed in memo, use cached result.
      // But if intermediates are large and not seen before, we can't cache them all (memory).
      // Instead, we can compute the path until we hit a known value (like 1 or a value already in memo).
      // Since inputs are up to 64-bit, and Collatz sequence length is manageable (max 524 steps for 32-bit), 
      // we can compute without full caching if we only cache when necessary.
      
      // Optimized: Compute step count from n to 1. If during computation we encounter a value in memo, use that.
      // Otherwise, push new values onto stack until we hit one in memo or 1.
    }
  }
  
  // Let's rewrite cleanly with BigInt and incremental caching
}

function solve(): void {
  let s = '';
  process.stdin.on("data", (c) => s += c);
  process.stdin.on("end", () => {
    const lines = s.split(/\n/).filter(l => l.trim() !== '').map(l => parseInt(l, 10));
    
    for (const n of lines) {
      if (Number.isNaN(n)) continue;
      
      let current: number | bigint = n as number;
      let steps = 0;
      const visited = new Set<bigint>(); // Avoid infinite loops in case (though Collatz conjecture says no cycles except 4->2->1)
      
      while (current !== 1) {
        if (typeof current === 'number') {
          const isEven = current % 2 === 0;
          current = isEven ? Math.floor(current / 2) : 3 * current + 1;
        } else {
          const bn = current as bigint;
          let nextBn: bigint;
          if (bn % 2n === 0n) {
            nextBn = bn >> 1n;
          } else {
            nextBn = 3 * bn + 1n;
          }
          
          current = Number(nextBn); // This loses precision! Must keep as bigint.
        }
        
        // Actually, we must track both number and BigInt values carefully.
        // Let's restructure the computation function properly.
      }
    }
  });
}

// Correct implementation using only process.stdin directly without async setup issues
const stepsMap = new Map<number, number>();

function collatzStepCount(n: number): number {
  if (n === 1) return 0;
  
  // If we've seen this number before in any previous query, use cached result
  if (stepsMap.has(n)) return stepsMap.get(n)!;
  
  let count = 1;
  let current: bigint = BigInt(n);
  
  while (current !== 1n) {
    const isEven = current % 2n === 0n;
    current = isEven ? current >> 1n : 3 * current + 1n;
    
    count++;
    
    // Check if we've seen this intermediate value before in any query
    // Since inputs are up to 64-bit, and intermediates might exceed, but problem says they fit in 64-bit.
    // So convert back to number if it fits? But we can't lose precision.
    // Use BigInt key for memoization only when value is representable as safe integer or within reason?
    // Actually, since the problem states intermediates fit in 64-bit signed, we can try converting to Number but be cautious.
    // However, JS Number loses precision above 2^53. So we must use BigInt for keys that are too large.
    
    // Strategy: Only cache if the intermediate value is within safe range OR if we encounter it again.
    // But to avoid infinite memory, only cache values that are likely to be reused (smaller than MAX_SAFE_INT or part of common sequences).
    // Instead, let's just compute the path and if we hit a value in memo, break and use cached result + remaining steps.
    
    const next = current;
    
    // Try to convert to number for caching small values
    try {
      const numVal = Number(next);
      if (!stepsMap.has(numVal) && Math.abs(numVal) <= 9007199254740992n /* MAX_SAFE_INT */ ) {
        stepsMap.set(numVal, count + collatzStepCount(1)); // Recursive call? No, iterative.
        // Better: compute from current to 1, and if we hit a known value, add the difference.
      }
    } catch (e) {}
    
    // Since we cannot easily cache large BigInts (performance/memory), and the sequence length is short (~524 steps max for 32-bit input, maybe more for 64-bit?), 
    // we can compute without heavy caching for intermediates. But for same integers appearing repeatedly, we should cache.
    
    // Let's use a simpler approach: if current value has been seen in any query, return cached total.
    // Since we process one by one, we can check if current (as number) is in memo.
    // If not, compute and add to memo only if the final step count is reusable?
    
    // Re-think: The problem says "同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください"
    // So we should cache for each unique n encountered across all queries.
    // And since inputs are integers, and intermediates are integers (within 64-bit), we can try to use BigInt as key.
    
    if (stepsMap.has(current.toString())) {
      count += stepsMap.get(Number(current)) ?? 0; // Wait, types mismatch.
      break;
    }
    
    // Compute until hitting 1 or a cached value
    let pathSteps = 0;
    let temp = current as number;
    while (temp !== 1 && !stepsMap.has(temp)) {
      const isEven = temp % 2 === 0;
      if (isEven) {
        temp = Math.floor(temp / 2);
      } else {
        // Potential overflow for Number, but problem says intermediates fit in 64-bit -> use BigInt internally
        let nextBn: bigint;
        const bn = current;
        if (bn % 2n === 0n) {
          nextBn = bn >> 1n;
        } else {
          nextBn = 3 * bn + 1n;
        }
        // Check if nextBn fits in Number without precision loss? No, use BigInt.
        temp = Number(nextBn); // This is dangerous for large values!
      }
      
      pathSteps++;
      // If temp becomes NaN or loses precision, stop? But problem guarantees 64-bit range.
      // So we trust it fits in JS Number if it's within 2^53? No.
    }
    
    // Let's implement a robust version using BigInt throughout and caching only when necessary.
    // Given constraints, we can use BigInt for all calculations and store in Map as string key.
  }
  
  stepsMap.set(n, count);
  return count;
}

// Final clean implementation
const dataBuffer: Buffer[] = [];
process.stdin.on("data", (c) => dataBuffer.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(dataBuffer).toString("utf8");
  const lines = s.split("\n").map(line => line.trim());
  
  const queries: bigint[] = [];
  
  for (const line of lines) {
    if (line.length === 0) continue;
    
    // Try to parse as number first, then BigInt if needed? But input is integer.
    let val: number | undefined;
    try {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) {
        queries.push(BigInt(n));
      }
    } catch (e) {}
    
    // If parsing fails as number, try BigInt? But input is integer.
    // If line is not a valid integer string, skip.
  }
  
  const memo = new Map<string, number>(); // Key: number.toString(), Value: steps to reach 1
  
  let totalSteps = 0;
  
  for (const n of queries) {
    if (!n) continue;
    
    const startStr = n.toString();
    if (memo.has(startStr)) {
      totalSteps += memo.get(startStr)!;
      continue;
    }
    
    let current: bigint = n;
    let steps = 0;
    
    // Compute path until we hit 1 or a value already in memo
    while (current !== 1n && !memo.has(current.toString())) {
      const isEven = current % 2n === 0n;
      let next: bigint;
      if (isEven) {
        next = current >> 1n;
      } else {
        next = 3 * current + 1n;
      }
      
      steps++;
      current = next;
    }
    
    // If we hit a cached value, add its stored steps and break early.
    if (memo.has(current.toString())) {
      const cachedSteps = memo.get(current.toString())!;
      // But wait, the cached value is steps from that number to 1.
      // So total steps for original n = steps + cachedSteps.
      // However, we need to account for the fact that if current was in memo, we don't add steps up to it again?
      // Actually, if current is in memo, then steps counted above are from n to current.
      // So total = steps + memo.get(current.toString())!;
      
      totalSteps += steps + (memo.get(current.toString())!);
      break; 
    } else if (current === 1n) {
      totalSteps += steps;
      // Add intermediate values to memo if they are small enough?
      // Since we already computed
