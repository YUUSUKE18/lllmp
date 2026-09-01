const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", (() => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;

  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n)) continue;
    if (target === null) {
      target = n;
      break;
    } else {
      nums.push(n);
    }
  }

  let count = 0n;
  const nums = BigInt(target) as bigint; // Target might be large, but problem says values fit in 64-bit. Actually, target is input on first line, so it fits in 64-bit signed/unsigned? "64bit integer" usually means signed 64-bit (int64).
  
  // Re-evaluating types based on "64bit integer range". JavaScript numbers are safe up to 2^53. For exact 64-bit integers, we should use BigInt or careful parsing.
  // The input values fit in 64-bit integer range. This means they can be negative and up to ~9e18.
  // Standard JS Number is float64, which has precision issues for integers > 2^53.
  // We must use BigInt for arithmetic involving numbers larger than 2^53-1.
  
  const targetBigInt = typeof target === 'number' ? BigInt(target) : target;
  const arr = nums.map(n => {
    const nBig = typeof n === 'number' ? BigInt(n) : n;
    // Check if input is within 64-bit signed range (-2^63 to 2^63-1)
    // The problem statement says "value and count fit in 64-bit integer range".
    // If the value itself exceeds safe integer range, parseInt won't work correctly.
    // We need to parse as BigInt directly from string to be safe for full 64-bit integers.
    return nBig;
  });

  // Reset logic with correct types
  const targetVal = targetBigInt;
  const numsArr: bigint[] = [];
  
  // Re-parse properly for the actual run since I used a loop above that didn't store correctly in this closure context logically.
  // Let's restart the parsing logic cleanly inside the end handler.
  
  // Actually, let's rewrite the whole logic to be clean.
  
  const targetLine = lines[0];
  if (!targetLine || targetLine.trim() === "") {
    console.log("pairs=0");
    return;
  }

  const targetStr = targetLine.trim();
  // Parse target as BigInt for safety with full 64-bit range
  let targetBig: bigint;
  try {
    targetBig = BigInt(targetStr);
  } catch (e) {
    console.log("pairs=0");
    return;
  }

  const nums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    
    // Use BigInt parsing to avoid precision loss
    const nStr = line.trim();
    let numBig: bigint;
    try {
      numBig = BigInt(nStr);
    } catch (e) {
      continue; // Ignore invalid lines
    }
    nums.push(numBig);
  }

  // Two Sum problem with duplicates and large numbers.
  // Use a Map to store frequency of each number encountered so far.
  // Or sort and use two pointers? Sorting is O(N log N). Hash map is O(N) average but worst case O(N^2) with collisions if not careful, or O(N) with good hashing.
  // Given constraints "practical time and memory", O(N) hash map is usually better for large inputs where sorting might be slow, 
  // but O(N log N) is perfectly acceptable for typical competitive programming limits (e.g., N=10^6).
  // However, with potential duplicates, iterating the array and checking a set/map is O(N) on average.
  
  // Let's use an object as a frequency map to store counts of numbers seen so far.
  // Since values are BigInt, we can use them as keys in JS objects directly (BigInt keys work in modern engines).
  
  const freq = new Map<bigint, bigint>();
  let pairs: bigint = 0n;

  for (const num of nums) {
    const needed = targetVal - num;
    if (freq.has(needed)) {
      // If there are multiple occurrences, any combination works.
      // Number of ways to choose 2 from k is k*(k-1)/2.
      // We need sum of frequencies * previous occurrences? 
      // Actually, simpler: For a specific occurrence of 'num', how many 'needed' have we seen before?
      // That count + the current num makes a pair.
      // So we add freq.get(needed) to total pairs.
      const countNeeded = freq.get(needed) || 0n;
      pairs += countNeeded;
    }
    freq.set(num, (freq.get(num) || 0n) + 1n);
  }

  console.log(`pairs=${pairs}`);
});
