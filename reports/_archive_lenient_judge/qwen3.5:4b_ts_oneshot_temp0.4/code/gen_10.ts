const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0); // Using BigInt to ensure full 64-bit range safety, though JS numbers are safe up to ~9e15. The prompt asks for 64-bit integer output which fits in standard Number.js if within +/- 2^53 safely but using BigInt avoids precision loss during accumulation of many values close to limits before final conversion or just strictly following "64bit" requirement via BigInt arithmetic then printing as string representation (which is exact).
  
  // Split by comma and process each part. 
  const parts = s.split(",");

  for (const p of parts) {
    let trimmed = p.trim();
    if (trimmed === "") continue;
    
    try {
      const n = parseInt(trimmed, 10);
      // Check validity: must be a valid integer string representation. 
      // Since we used split and trim, empty strings are handled. 
      // We need to ensure it's actually an integer (no decimals).
      if (!Number.isFinite(n)) continue;

      const countMap = new Map<number, number>();
      
      // To avoid re-declaring the map inside loop for performance in large inputs, we can declare outside or use a closure. 
      // However, since this is Node.js event driven and data arrives chunked, declaring once at end of processing logic is fine if we structure it right.
      // Let's refactor slightly to make 'countMap' accessible without re-declaring inside loop for clarity in single scope.
      
    } catch (e) {
      continue; 
    }

    // Re-structure: Use a Map declared outside the loop logic within this function block.
  }
  
  // Correct approach with proper structure:
}

// Let's rewrite cleanly inside the end handler to be self-contained and correct per spec without external deps.
const countMap = new Map<number, number>();

process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  
  // Helper to parse and validate integer
  function isValidInt(str: string): boolean {
    return /^-?\d+$/.test(str);
  }

  let sumBig = BigInt(0);
  
  for (const p of s.split(",")) {
    const trimmed = p.trim();
    if (!trimmed) continue; // Skip empty elements
    
    if (isValidInt(trimmed)) {
      const n = parseInt(trimmed, 10);
      
      countMap.set(n, (countMap.get(n) || 0) + 1);
      sumBig += BigInt(n);
    } else {
      continue; // Ignore non-integer elements like floats or text
    }
  }

  let maxCount = -1n; 
  const uniqueValues: number[] = [];
  
  for (const [key, val] of countMap.entries()) {
    if (val > maxCount) {
      maxCount = BigInt(val); // Wait, we need to output 'count' as integer. The spec says "個数" which is a quantity. 
      // Actually the requirement: "重複を除いた整数について、個数と合計を求めます。" -> For each unique integer, find its count and sum?
      // OR does it mean: Find the total number of unique integers AND their individual sums?
      // Re-reading carefully: "それらのうち『重複を除いた整数』について、個数と合計を求めます。" 
      // Interpretation A: For each distinct integer, output its count and sum (which is just itself). That seems trivial.
      // Interpretation B: Count how many unique integers there are? And what is the total sum of all numbers?
      // Let's look at similar problems or standard interpretations. Usually "個数" refers to frequency if iterating over duplicates, but here it says "for duplicated-excluded integers".
      // If I have 1, 2, 3 -> unique are {1, 2, 3}. Count of each is 1? Sum of all is 6?
      // Or does it mean: Calculate the count (of occurrences) and sum for EACH distinct integer found in input? 
      // But output format is `count=<N> sum=<S>` implying a single line with two values.
      
      // Most logical interpretation given "1行だけ出力":
      // It likely means: Total number of unique integers AND the total sum of all integers provided.
      // Example Input: 1,2,2,3 -> Unique: {1, 2, 3}. Count (of uniques): 3? Sum: 6+4 = 10? Or count=3 (unique items), sum=1+2+2+3=8?
      // Let's re-read "重複を除いた整数について、個数と合計を求めます". 
      // Subject: "Duplicate-excluded integers" (the set of unique numbers).
      // Actions on them: Find their count and their total sum.
      // This phrasing is ambiguous in Japanese technical specs without context like "for each... output..." vs global stats.
      // Given the output format `count=<val> sum=<val>` (singular values), it implies aggregate statistics over the set of unique integers or perhaps: 
      // 1. The number of unique elements found? 
      // 2. The sum of all original numbers? OR Sum of distinct numbers only?
      
      // Let's assume standard competitive programming interpretation for such vague phrasing when output is single line:
      // "Count" = Number of unique integers present in the input list.
      // "Sum" = Sum of ALL integers in the input (including duplicates) or just sum of distinct ones? 
      // Usually if they wanted sum of distinct, they'd say "sum of distinct values". If they said "count and sum", it often implies count of items (unique types) and total value.
      
      // However, another reading: For every unique integer X in the input, calculate its frequency (count) and add to a global sum? No, output is single line.
      
      // Let's try this interpretation which fits "1行" perfectly with two numbers:
      // Count = Number of distinct integers found.
      // Sum = Total sum of all provided integers (including duplicates). 
      // Why? Because if it was sum of unique only, the word 'duplicate' in input description would make less sense than just saying 'distinct values'. The mention of processing "duplicated-excluded" might imply we care about uniqueness for counting.
      
      // Alternative interpretation: Count = Sum of counts (which is total items)? No.
      
      // Let's go with the most robust math puzzle interpretation often seen in such prompts:
      // 1. How many unique numbers are there? (Count)
      // 2. What is the sum of these unique numbers? OR Sum of all numbers? 
      // Given "合計" usually means total sum of data provided unless specified otherwise ("distinct values' sum"). But since we filtered for duplicates first...
      
      // Let's look at the example logic pattern: Usually `count` refers to frequency if iterating, but here output is fixed format.
      // Hypothesis 1: Count = number of unique integers. Sum = sum of all integers (with duplicates). 
      // Hypothesis 2: Count = number of unique integers. Sum = sum of unique integers only.
      
      // Let's assume the prompt implies we are analyzing the set of unique numbers found in the input stream.
      // "重複を除いた整数" -> The set {x | x exists}. 
      // For this set, find its size (count) and its sum? Or count how many times each appears? No, output is single line.
      
      // Let's assume: Count = Number of unique integers. Sum = Total sum of all input numbers (including duplicates). This is a common variation where you dedup for counting but keep original data for summation unless specified "sum of distinct". 
      // Actually, re-reading strictly: "For the duplicate-excluded integers [the set], find count and total." -> Count(size) + Sum(set elements)?
      // Let's try that. It makes sense as a property of the unique set itself.
      
      // Example Input: 1,2,2,3 
      // Unique Set: {1, 2, 3}
      // Count (of this set): 3
      // Sum (of elements in this set): 6
      
      // If I do sum of all including duplicates: Sum = 8. Which one is intended? 
      // "合計" without qualification usually means total sum. But the subject is "duplicate-excluded integers". So likely sum of those specific items.
      
      // Decision: Count = Size of unique set. Sum = Sum of elements in that unique set (excluding duplicates).
      // Why? Because if it meant global stats, why mention "duplicated excluded" as the subject for calculation? 
      // It says "For [the duplicate-excluded integers], calculate count and sum". This implies properties OF the resulting list.
      
  }

  const uniqueCount = countMap.size;
  
  let distinctSumBig = BigInt(0);
  for (const n of countMap.keys()) {
    distinctSumBig += BigInt(n);
  }

  console.log(`count=${uniqueCount} sum=${distinctSumBig}`);
});
