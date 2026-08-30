const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let maxSum = Number.MIN_SAFE_INTEGER;
  let first = true;

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n = parseInt(f, 10);
      if (Number.isNaN(n) || !Number.isFinite(n)) continue;
      
      let count: Map<number, number> | null = first ? new Map() : null;
      // Using a simple object for counting since we need to track unique integers and their sums separately.
      // Actually, the requirement is "count of unique integer" (which implies each unique value appears once in our set) 
      // Wait: "重複を除いた整数について、個数と合計を求めます。" -> For numbers after removing duplicates? Or count how many times they appear and sum them up excluding duplicates?
      // Re-reading carefully: "それらのうち『重複を除いた整数』について、個数と合計を求めます。" 
      // Interpretation A (Most likely): Identify unique integers. Count = number of unique integers found in total input. Sum = sum of all these unique integers.
      // Example Input: 1,2,3,1 -> Unique: {1,2,3}. Count=3, Sum=6.
      
      const seen = new Set<number>();
      if (!seen.has(n)) {
        seen.add(n);
        
        let totalSum = Number.MIN_SAFE_INTEGER; // This logic is flawed in the loop structure above because we need to accumulate sum of unique numbers only once per number.
        
        // Let's restructure for clarity and correctness within a single pass or two passes (one pass collect, one compute). 
        // Since N can be large but memory allows storing seen values, let's do it in one go with correct logic.
      }
    } catch {} 
  }

  // Correct Logic Implementation:
  const uniqueNumbers = new Set<number>();
  
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      let n = parseInt(f, 10);
      if (Number.isNaN(n) || !Number.isFinite(n)) continue;
      
      // Check if already seen to avoid double counting for the unique set sum and count logic.
      // If we encounter a number that is NOT in our 'uniqueNumbers' set:
      // We add it, increment totalCount (count of unique integers), and add its value to totalSum.
      // But wait, if input is "1, 2, 3", sum = 6, count=3. 
      // If input is "1, 1, 2", unique are {1, 2}. Count=2, Sum=3.
      
      let added = false;
      for (const num of uniqueNumbers) {
        if (num === n) {
          added = true; 
          break; // Found duplicate in the set itself? No, Set handles uniqueness automatically.
        }
      }
      
      // Actually simpler: Just use a Map to track counts per number first? 
      // "重複を除いた整数" implies we treat each unique integer as one entity for the final calculation.
      // So if input is 1,2,3,1 -> Unique set {1,2,3}. Count=3, Sum=6.
      
      let val = parseInt(f.trim(), 10);
      if (Number.isNaN(val)) continue;

      uniqueNumbers.add(val);
  }

  // Calculate sum of the unique numbers found above? 
  // Wait, my previous loop logic was messy. Let's rewrite cleanly inside end event.
  
});

// Rewriting the whole block correctly in one go for final output:
