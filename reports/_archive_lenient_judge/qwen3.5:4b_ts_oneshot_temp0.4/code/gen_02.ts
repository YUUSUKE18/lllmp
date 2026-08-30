const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let countMap = new Map<number, number>();
  let sumTotal = BigInt(0);

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f.trim(), 10);
    if (!Number.isFinite(n) || isNaN(parseInt(f))) continue; // Invalid integer check
    let val: number | bigint = BigInt(n);

    if (!(val in countMap)) {
      countMap.set(val, 1n);
    } else {
      const currentCount = countMap.get(val)!;
      sumTotal += (currentCount * n) + (BigInt(0)); // Wait, logic error here. Let's fix the loop structure for clarity and correctness based on requirements: "count" is number of unique items with that value? No, re-read spec carefully.

  Re-reading spec: "重複を除いた整数について、個数と合計を求めます。"
  Interpretation A: For each *unique* integer found in the input, output its count (frequency) and sum (value repeated by frequency). But usually this phrasing implies grouping unique numbers? Or maybe it means for every distinct number x present, what is its total contribution to a global set of counts/sums?
  Actually, looking at standard competitive programming patterns: "Count" likely refers to the count of that specific integer (frequency), and "Sum" refers to the sum of all instances of that integer. Since it says "unique integers", we iterate over unique keys in our map.

  Let's re-parse the logic inside the loop properly before outputting.
  
  const s = Buffer.concat(data).toString("utf8");
  let countMap: Map<number, number> = new Map(); // Key: integer value, Value: frequency (count)
  let sumTotalPerKey = new Map<number, bigint>();

  for (const f of s.split(",")) {
    const trimmed = f.trim();
    if (!trimmed || !/^-?\d+$/.test(trimmed)) continue; // Skip empty or non-integer
  
    const n = parseInt(trimmed);
    
    let currentCount = countMap.get(n) ?? 0;
    sumTotalPerKey.set(n, (sumTotalPerKey.get(n) as bigint | undefined) || BigInt(0));

    if (!countMap.has(n)) { // First time seeing this number? 
      // Actually simpler: just increment count and add to running total for that key.
    }
    
    // Correct logic flow:
  }
  
  // Let's rewrite the loop cleanly inside the final block below.

});
