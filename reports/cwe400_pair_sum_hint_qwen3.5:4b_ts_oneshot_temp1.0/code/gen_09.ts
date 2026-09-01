const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: bigint = 0n;
  const counts: number[] = []; // Store line numbers as indices
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "") continue;
    
    const valStr = lines[i].trim();
    const n = BigInt(valStr);
    
    // Line 0 is the target, subsequent lines are integers
    if (i === 0) {
      target = n;
    } else {
      if (!isNaN(n)) {
        counts.push(i);
      }
    }
  }
  
  let countPairs: bigint = 0n;
  const nCounts = counts.length;
  
  // Use a HashSet (using a boolean array for density check or a Set)
  // Since values are 64-bit, we cannot use an array indexed by value directly.
  // We will use a Map<BigInt, number[]> to store indices where a value appears.
  const valueIndices: Map<BigInt, number[]> = new Map();
  
  // Helper to add index to map
  function addIndex(value: bigint) {
    if (!valueIndices.has(value)) {
      valueIndices.set(value, []);
    }
    valueIndices.get(value)!.push(counts.indexOf(value));
  }

  for (let i = 0; i < nCounts; i++) {
    const v1 = BigInt(counts[i]);
    // We are looking for v2 such that v1 + v2 == target => v2 == target - v1
    const requiredVal = target - v1;
    
    if (valueIndices.has(requiredVal)) {
      const indices = valueIndices.get(requiredVal)!;
      // We need pairs with different positions.
      // Check if current index i is already in the list for requiredVal
      const existingCount = indices.length;
      
      // Since we are iterating linearly, we can just iterate through stored indices
      // However, to be efficient and correct (handling duplicates), let's do it carefully.
      // For each pair (i, j) where counts[i] + counts[j] == target.
      // We want the number of unique pairs (idx1, idx2) with idx1 != idx2.
      // The approach: iterate all pairs from `counts`, check sum.
      // But O(N^2) might be slow if N is large? "Adversarial large input" implies we need efficiency.
      // Actually, we can optimize using the Map approach correctly.
      
      for (const idx of indices) {
        if (idx !== i && !(valuesAreEqual(v1, counts[idx]))) {
           // Wait, I need to check if value at counts[i] + value at counts[idx] == target
           // But I already calculated requiredVal.
           // So if count[i] is v1, and we have an index `idx` in the map for `requiredVal`,
           // then count[idx] MUST be `requiredVal`.
           // So sum is always correct. We just need to ensure distinct indices.
        }
      }
      
      // Better logic:
      // Iterate through all items. For item i, check how many j > i exist such that values[i] + values[j] == target.
      // Wait, simply iterating the `counts` array is O(N^2) which could be too slow if N=10^6.
      // However, usually for "sum of two numbers" problems, a Hash Set approach is O(N).
      // Let's do O(N).
    }
  }
  
  // Re-evaluating algorithm for O(N):
  // We have an array of values `counts` (which are line indices, but let's call them actual numbers for clarity in logic)
  // Actually `counts` stores the ORIGINAL VALUES from input, which I misnamed.
  // Let's restart the parsing and counting clearly.
  
  const nums = [];
  for(const val of counts) {
    nums.push(val); // val is the number itself (BigInt)
  }
  
  // Use a Map to store count of each number seen so far? No, we need positions.
  // Actually, we just need to iterate through `nums`.
  // For each num at index i, we check if (target - num) exists in the map.
  // Add to result.
  
  const map = new Map<BigInt, number>(); // value -> count of occurrences seen so far? 
  // Actually we need total pairs.
  // If we see a number 'x' and we know 'y' has been seen k times.
  // Number of new pairs with current x is k (if y == target - x).
  // So algorithm:
  // map stores { value: count }
  // for x in nums:
  //   needed = target - x
  //   if map.has(needed):
  //     countPairs += map.get(needed)!
  //   map.set(x, (map.get(x) || 0) + 1)
  
  map.clear();
  countPairs = 0n;
  for (const num of nums) {
    const needed = target - num;
    if (map.has(needed)) {
      const c = map.get(needed)!;
      countPairs += BigInt(c);
    }
    // Get current count for num, default 0
    let currentCount = map.get(num) || 0n;
    map.set(num, currentCount + 1n);
  }
  
  console.log(`pairs=${countPairs}`);
});
