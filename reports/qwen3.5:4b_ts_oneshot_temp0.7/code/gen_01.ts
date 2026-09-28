const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(/,+/);
  let sum = BigInt(0);
  const countMap = new Map<number, number>();
  for (const part of parts) {
    if (part.trim() === "") continue;
    const n = parseInt(part.trim(), 10);
    if (Number.isNaN(n)) continue;
    if (!countMap.has(n)) {
      countMap.set(n, 0);
    }
    const c = countMap.get(n)! + 1;
    countMap.set(n, c);
    sum += BigInt(c); // Wait, this logic is wrong. Need to accumulate the value itself.
  }
  
  // Corrected logic for sum:
  // We need sum of (count * value) for each unique number.
  // Or simply: sum = sum(countMap.get(n) * n)
  // Let's restart the loop logic properly inside the code below.
});

// Re-declaring to ensure single block and correct logic flow without state leakage issues in my thought process simulation
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(/,+/);
  
  // Use a map to store counts and values. 
  // Key: number, Value: count
  const counts = new Map<number, bigint>();
  let totalSum = BigInt(0);

  for (const part of parts) {
    if (part.trim() === "") continue;
    try {
      const n = parseInt(part.trim(), 10);
      if (Number.isNaN(n)) continue;
      
      const currentCount = counts.get(n) ?? BigInt(0);
      const newCount = currentCount + 1n;
      counts.set(n, newCount);
      
      totalSum += n * newCount; // Add the contribution of this number's count to the sum
    } catch (_) {
      // In case parseInt fails for some reason, skip
      continue;
    }
  }

  const uniqueElements = counts.size;
  const countVal = BigInt(uniqueElements);
  
  console.log(`count=${uniqueElements} sum=${totalSum}`);
});
