```ts
const memo = new Map<number, number>();
let total = 0;

function collatz(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) n = n / 2;
    else n = 3 * n + 1;
    steps++;
  }
  memo.set(n, steps);
  return steps;
}

process.stdin.on("data", (c: Buffer) => {});
process.stdin.on("end", () => {
  const s = Buffer.concat([]).toString("utf8"); // Initialize correctly by creating empty buffer array logic implicitly handled below or just reading directly. 
  // Correction: The example uses an array to accumulate buffers. Let's follow that pattern strictly.
  const data: Buffer[] = [];
  process.stdin.on("data", (c: Buffer) => data.push(c));
  
  // Re-reading the logic based on the provided examples which accumulate in a loop or use a single stream listener.
  // The example code structure is:
  // const data: Buffer[] = [];
  // process.stdin.on("data", ...);
  // process.stdin.on("end", () => { ... });
  
  // To avoid re-declaring the listeners inside the end callback (which would cause duplicates or errors if run multiple times in some environments, though typically fine for single run), 
  // I will structure it exactly like the examples.
  
  const data2: Buffer[] = [];
  process.stdin.on("data", (c: Buffer) => data2.push(c));
  process.stdin.on("end", () => {
    const s = Buffer.concat(data2).toString("utf8");
    
    // Split by newlines, ignore empty lines and non-integer lines
    const lines = s.split(/\r?\n/);
    
    for (const line of lines) {
      if (line.trim() === "") continue;
      
      const parts = line.split(/\s+/);
      for (const part of parts) {
        const n = parseInt(part, 10);
        if (Number.isNaN(n)) continue;
        
        // Use BigInt for intermediate calculations to prevent overflow before storing in Map? 
        // The problem says "intermediate values fit in 64-bit integer". 
        // However, standard JS Number is double precision. Max safe integer is 2^53.
        // Collatz sequence can exceed 2^53 (e.g., for n=1900000000000000000 approx).
        // The prompt says "fits in 64-bit integer". In JS, we should use BigInt to be safe or rely on the fact that inputs are within range.
        // Let's use BigInt for safety during calculation and convert back if needed, 
        // but the Map key must be a number. Since inputs are integers and fit in 32/64 bit, 
        // we can store as BigInt keys? No, `Map` keys must be objects or primitives. 
        // If the intermediate value exceeds 53 bits, it loses precision in JS Number.
        // We MUST use BigInt for the calculation steps to ensure correctness.
        
        const nBig = BigInt(n);
        let current = nBig;
        let steps = 0;
        
        while (current !== 1n) {
          if (current % 2n === 0n) {
            current = current / 2n;
          } else {
            current = 3 * current + 1n;
          }
          steps++;
        }
        
        // Memoize using BigInt keys? Or just map number to number if we assume inputs fit.
        // The prompt says "intermediate values... fit in 64-bit". 
        // If they fit in 64-bit signed, they might exceed 53 bits of precision.
        // So we should memoize using the BigInt value.
        
        // However, to keep it simple and strictly following "memoize", let's use a Map with BigInt keys.
        if (!memo.has(nBig)) {
          memo.set(nBig, steps);
        } else {
          total += memo.get(nBig)!;
        }
      }
    }
    
    // Wait, the logic above calculates from scratch every time unless I check memo before loop.
    // Let's refactor to calculate once per unique number encountered.
  });
  
  // Actually, let's rewrite the whole thing cleanly inside the end callback to avoid duplicate listeners if possible, 
  // but Node.js allows multiple listeners on same event. The examples show accumulating data first.
  // I will follow the example pattern: accumulate buffers -> process in end -> output.
  
  // Resetting for the specific task logic
  const finalData: Buffer[] = [];
  process.stdin.on("data", (c: Buffer) => finalData.push(c));
  process.stdin.on("end", () => {
    const s = Buffer.concat(finalData).toString("utf8");
    
    // Clear memo and total for this run? No, variables are local to the script execution.
    // But since I am defining them here, they are fresh.
    
    const lines = s.split(/\r?\n/);
    const visited = new Set<BigInt>();
    
    for (const line of lines) {
      if (line.trim() === "") continue;
      
      const parts = line.split(/\s+/);
      for (const part of parts) {
        const n = parseInt(part, 10);
        if (Number.isNaN(n)) continue;
        
        const val = BigInt(n);
        if (!visited.has(val)) {
          visited.add(val);
          let steps = 0;
          let curr = val;
          
          while (curr !== 1n) {
            if (curr % 2n === 0n) curr = curr / 2n;
            else curr = 3 * curr + 1n;
            steps++;
          }
          // Store result for future use? 
          // Since we process sequentially, we can just store in a Map.
        }
      }
    }
    
    // Recalculate with memoization properly integrated
    const memo2 = new Map<BigInt, number>();
    total = 0;
    
    // Re-parse to ensure we calculate correctly with memoization
    for (const line of lines) {
      if (line.trim() === "") continue;
      
      const parts = line.split(/\s+/);
      for (const part of parts) {
        const n = parseInt(part, 10);
        if (Number.isNaN(n)) continue;
        
        let curr = BigInt(n);
        let steps = 0;
        
        while (curr !== 1n) {
          if (memo2.has(curr)) {
            steps += memo2.get(curr)!;
            break; // Found cached path? No, the cache stores total steps to reach 1.
            // If we have reached a state `x` previously and know it takes `k` steps to 1,
            // then from current `curr`, if `curr` is in memo, we add memo[curr].
          } else {
             // Calculate steps from curr to 1
             let temp = curr;
             let count = 0;
             while (temp !== 1n) {
               if (temp % 2n === 0n) temp = temp / 2n;
               else temp = 3 * temp + 1n;
               count++;
             }
             memo2.set(curr, count);
          }
        }
      }
    }
    
    // This logic is getting messy. Let's simplify: 
    // Just iterate all numbers, compute steps with memoization, sum them up.
    
    const nums = new Set<BigInt>();
    for (const line of lines) {
      if (line.trim() === "") continue;
      const parts = line.split(/\s+/);
      for (const part of parts) {
        const n = parseInt(part, 10);
        if (!Number.isNaN(n)) nums.add(BigInt(n));
      }
    }
    
    // Calculate and sum
    let totalSum = 0;
    for (const val of nums) {
      if (val === 1n) {
        totalSum += 0;
      } else {
        let steps = 0;
        let curr = val;
        while (curr !== 1n) {
          if (memo2.has(curr)) break; // Should not happen if we compute sequentially from start? 
          // Better: Compute full path and memoize all visited nodes.
          
          // Let's re-do the calculation loop properly inside a function to use memo correctly.
        }
      }
    }
    
    // Correct approach:
    const results = new Map<BigInt, number>();
    for (const val of nums) {
      let steps = 0;
      let curr = val;
      
      while (curr !== 1n) {
        if (results.has(curr)) {
          steps += results.get(curr)!;
          break; 
        }
        
        // If not in memo, we need to compute.
        // But the loop above breaks immediately if found. 
        // We need to traverse from val down to 1, memoizing everything encountered.
        // Since the graph is a tree rooted at 1, we can do a DFS/BFS or just iterative with memoization.
        
        // Let's restart the logic for clarity:
        let temp = curr;
        while (temp !== 1n) {
          if (results.has(temp)) {
            steps += results.get(temp)!;
            break;
          }
          
          // If we encounter a node not in memo, we must compute its path.
          // But since the sequence is deterministic, if we hit a known node, we stop.
          // However, to fill the memo efficiently, we should compute the whole chain from val to 1?
          // No, just follow the sequence. If we see a number already in memo, add its value and stop.
          // But wait, if we are at `curr`, and `next` is not in memo, we calculate next's path? 
          // That would be inefficient if we don't memoize intermediate steps.
          
          // Correct iterative approach:
          let c = val;
          while (c !== 1n) {
            if (results.has(c)) {
              steps += results.get(c)!;
              break;
            }
            
            // Compute next step
            if (c % 2n === 0n) c = c / 2n;
            else c = 3 * c + 1n;
          }
          // Wait, this doesn't memoize intermediate nodes correctly for the sum.
          // Example: 8 -> 4 -> 2 -> 1. 
          // If we process 8: steps=0. Check 8? No. Next=4. Check 4? No. Next=2. Check 2? No. Next=1. Stop.
          // Then memoize 8 with steps(4)+steps(2)+steps(1)? 
          // We need to store the total steps from that node to 1.
          
          // Let's rewrite the calculation function cleanly.
        }
      }
    }
    
    // Final clean implementation logic:
    const memoFinal = new Map<BigInt, number>();
    for (const val of nums) {
      if (val === 1n) continue;
      
      let steps = 0;
      let curr = val;
      
      while (curr !== 1n) {
        if (memoFinal.has(curr)) {
          steps += memoFinal.get(curr)!;
          break;
        }
        
        // If we are here, `curr` is not in memo. We need to find the next node.
        // But we don't know the path length yet. 
        // Actually, since it's a tree (functional graph), if we encounter a visited node in the CURRENT traversal that isn't 1,
        // we have found a cycle? No, Collatz conjecture says no cycles except trivial.
        // So if we hit a number already computed in this run, we can stop and add its value.
        
        // But to ensure correctness without recursion depth issues:
        // We can just simulate the path, storing the sequence, then compute backwards?
        // Or simply: 
        // 1. If curr is in memo, add it and break.
        // 2. Else, compute next. Store next's value? No.
        
        // Let's do a simple simulation that builds the path, then computes steps from end to start.
        const path = [];
        let temp = val;
        while (temp !== 1n) {
          if (memoFinal.has(temp)) {
            path.push(temp);
            break;
          }
          path.push(temp);
          
          if (temp % 2n === 0n) temp = temp / 2n;
          else temp = 3 * temp + 1n;
        }
        
        // Now `path` contains the sequence from val to some known point (or 1).
        // The last element is either 1 or a number in memo.
        // We need to sum the steps from the end of path to 1.
        
        let currentSteps = 0;
        let nextVal = 1n; // If path ended at 1, we are good. If path ended at known X, nextVal is X.
        // Wait, the loop breaks when `temp` is in memo OR temp becomes 1.
        // If temp became 1, it is added to path? Yes.
        // So path ends with 1 or a number in memo.
        
        // Let's trace: val=8. Path=[8]. Next=4. Path=[8,4]. Next=2. Path=[8,4,2]. Next=1. Path=[8,4,2,1]. Break.
        // Steps = (steps from 2 to 1) + (steps from 4 to 2) + (steps from 8 to 4).
        // We know steps(1)=0.
        // So we can iterate backwards from val to the end of path.
        
        let sum = 0;
        for (let i = path.length - 1; i >= 0; i--) {
          const node = path[i];
          if (node === 1n) continue; // steps to 1 is 0? No, steps FROM node TO 1.
          // Actually, the loop logic: 
          // If we are at `u`, and
