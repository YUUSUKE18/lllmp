const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  if (lines.length === 0 || lines[0].trim() === "") {
    console.log(`pairs=0`);
    return;
  }
  
  let target: number | null = null;
  let numLines = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    
    if (numLines === 0) {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) target = n;
      break;
    } else {
      const val = parseInt(line, 10);
      if (!Number.isNaN(val)) numLines++;
    }
  }

  if (target === null || numLines < 2) {
    console.log(`pairs=0`);
    return;
  }

  // Large input optimization: Use a hash map to count frequency of numbers seen so far.
  // We need pairs (i, j) with i < j such that nums[i] + nums[j] == target.
  // If we encounter a number 'x' and the complement 'target - x' is in our map,
  // it means all previously seen instances of 'target - x' can pair with this 'x'.
  // However, if 'x' itself has appeared before (e.g., target = 10, we have 5, then another 5),
  // the two 5s form a pair.
  
  // Map: number -> count of occurrences seen so far
  const counts = new Map<number, bigint>();
  let pairs = 0n;

  for (let i = 0; i < numLines; i++) {
    const val = parseInt(lines[i], 10);
    if (Number.isNaN(val)) continue;
    
    // Calculate complement
    // Since values are within 64-bit integer range, target can also be within it.
    // JavaScript Number is safe for integers up to 2^53, but input says 64-bit integers.
    // To be safe against precision loss with very large integers (close to 2^63),
    // we should use BigInt for calculations and storage if the values exceed 2^53.
    // However, the problem states "values and count are within 64-bit integer range".
    // It does not explicitly say they fit in JavaScript's safe integer zone (2^53).
    // Given the constraint of "no external packages" and "TypeScript", 
    // using BigInt is the most robust approach for 64-bit integers.

    const bigVal = BigInt(val);
    const complement = target ? (BigInt(target) - bigVal) : 0n;

    if (!counts.has(complement)) {
      counts.set(complement, 0n);
    }
    
    // Add the count of complements seen so far to the total pairs
    // Each previously seen 'complement' can form a pair with this current 'val'.
    const pairCount = counts.get(complement)!;
    if (pairCount > 0n) {
      pairs += pairCount;
    }

    // Increment count for the current value
    let currentCount = counts.get(bigVal)! + 1n;
    counts.set(bigVal, currentCount);
  }

  console.log(`pairs=${Number(pairs)}`);
});
