const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let targetLineIndex = -1;
  let lineCount = 0;
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    lineCount++;
    
    if (lineCount === 1) {
      const parts = line.split(/\s+/);
      let target: bigint = 0n;
      for (const part of parts) {
        try {
          target = BigInt(parseInt(part, 10));
          break;
        } catch (e) {
          continue;
        }
      }
      if (!Number.isNaN(target)) {
        targetLineIndex = lineCount - 1;
        break;
      }
    } else {
      for (const char of line) {
        try {
          const val = BigInt(parseInt(String(char), 10));
          nums.push(val);
        } catch (e) {}
      }
    }
  }

  let targetBig: bigint | null = null;
  let numBigInts: bigint[] = [];
  
  let currentLineIdx = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    currentLineIdx++;
    
    if (currentLineIdx === 1) {
      const parts = line.split(/\s+/);
      for (const part of parts) {
        try {
          targetBig = BigInt(part);
          break;
        } catch {}
      }
      if (!isNaN(Number(targetBig))) {
        targetBig = targetBig!;
        break;
      }
    } else {
      for (const char of line) {
        try {
          const val = BigInt(parseInt(String(char), 10));
          numBigInts.push(val);
        } catch {}
      }
    }
  }

  let pairs = 0n;
  if (targetBig !== null && numBigInts.length > 0) {
    // Using a Set to store seen values for O(1) lookup
    const seen: Map<bigint, bigint> = new Map();
    
    for (let i = 0; i < numBigInts.length; i++) {
      const currentVal = numBigInts[i];
      const needed = targetBig - currentVal;
      
      if (seen.has(needed)) {
        pairs += BigInt(seen.get(needed)!.count); // Count occurrences of needed value seen so far
      }
      
      seen.set(currentVal, new Map([currentVal, 1]));
    }
    
    // Recalculate correctly: we need to count pairs (i, j) where i < j and nums[i] + nums[j] == target
    // Reset for correct logic
    const countMap: Map<bigint, bigint> = new Map();
    let pCount = 0n;
    
    for (const val of numBigInts) {
      const needed = targetBig - val;
      if (countMap.has(needed)) {
        pCount += countMap.get(needed)!;
      }
      const currentCount = countMap.get(val)! + 1n;
      countMap.set(val, currentCount);
    }
    
    pairs = pCount;
  }

  console.log(`pairs=${pairs}`);
});
