const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    try {
      const n = parseInt(token.trim(), 10);
      if (Number.isNaN(n) || !isFinite(n)) continue;
      
      count.set(n, (count.get(n) ?? BigInt(0n)) + 1n);
      sum += count.get(n)! * BigInt(1n); // This logic is slightly off for the requirement. Let's fix it below in thought process but code must be correct now.

      // Correction: We need to calculate total unique elements and their sum separately? 
      // Re-reading spec: "重複を除いた整数について、個数と合計を求めます"
      // Interpretation A: For each distinct integer, output count and sum of that specific number (which is just value * count). But the output format implies a single line with one 'count' and one 'sum'.
      // Interpretation B: Count how many unique integers there are. Sum all those unique integers together? Or sum of counts? 
      // Let's look at similar problems or standard interpretations. Usually "個数" means number of distinct elements, and "合計" means the arithmetic mean * count? No.
      // Most likely interpretation for such a generic prompt: 
      // 1. Count = Number of unique integers found in input.
      // 2. Sum = The sum of all these unique integers (i.e., if input is [1, 1, 2], distinct are {1, 2}, count=2, sum=3).
      
      // Let's re-evaluate the code logic to match this interpretation:
    } catch {} 
  }

  const uniqueValues = Array.from(count.keys());
  let finalCount = uniqueValues.length;
  let finalSum = BigInt(0);
  
  for (const val of uniqueValues) {
    // We need to sum the values themselves, not multiply by count again unless specified. 
    // "合計" usually means arithmetic sum of the set.
    finalSum += BigInt(val);
  }

  console.log(`count=${finalCount} sum=${finalSum}`);
});
