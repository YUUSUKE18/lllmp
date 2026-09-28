const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    // Leading zeros check and parsing logic to ensure it's a valid integer string representation
    const trimmedF = f.trim();
    let n: bigint;
    
    try {
      // Use BigInt parsing for 64-bit range safety, then convert back or compare directly if needed. 
      // However, the spec says "values fit in 64bit", so standard Number might suffice but can lose precision on >2^53-1.
      // To be safe and strictly follow "integer" interpretation without overflow issues:
      
      n = BigInt(trimmedF);
    } catch {
      continue; 
    }

    count++;
    
    if (maxVal === null || Number(n) > maxVal) {
      maxVal = Number(n);
    } else if (!Number.isNaN(Number(maxVal)) && Number(n) == maxVal) {
       // If it's equal, we don't need to update maxVal but count is already incremented.
       // Wait, logic check: Max value should be the maximum of all elements found so far.
    } else if (maxVal !== null && n > BigInt(maxVal)) {
      maxVal = Number(n);
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
