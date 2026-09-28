const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let maxSum = BigInt(0); // Using BigInt to ensure precision, though problem says fits in 64-bit int.
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    try {
      const n = parseInt(f.trim(), 10);
      if (isNaN(n) || !Number.isFinite(n)) continue;
      
      // Use a Set to track unique numbers and their counts/sums manually or via Map
      // Since we need count per number, let's use an object/map approach.
    } catch {} 
  }

  const map = new Map<number, {count: bigint, sum: bigint}>();
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    try {
      const n = parseInt(f.trim(), 10);
      if (isNaN(n) || !Number.isFinite(n)) continue;

      let entry = map.get(n);
      if (!entry) {
        entry = { count: BigInt(1), sum: BigInt(n) };
        map.set(n, entry);
      } else {
        const c = Number(entry.count + 1n); // Increment count
        entry.count += 1; 
        entry.sum += n as bigint; // Add value to sum
        
        if (c > maxSum) maxSum = BigInt(c);
      }
    } catch {} 
  }

  console.log(`count=${maxSum} sum=${map.get(Number(maxSum))?.sum}`);
});
