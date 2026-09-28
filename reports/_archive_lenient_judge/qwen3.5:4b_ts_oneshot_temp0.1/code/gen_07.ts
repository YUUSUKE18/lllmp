const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0);
  const counts = new Map<number, number>();

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    
    let count = counts.get(n) ?? 0;
    sum += BigInt(count * n); // Wait, this logic is wrong. Let me re-read the requirement.

    // Re-reading: "重複を除いた整数"について、個数と合計を求めます。
    // This means for each unique integer value x that appears in input:
    // count = how many times it appeared? Or does it mean we only consider distinct values and their sum/count based on something else?
    
    // Actually, looking at the phrasing "重複を除いた整数" (integers with duplicates removed) usually means we look at unique elements.
    // But then what is 'count'? If I have [1, 2, 3], count of 1 is 1, sum is 1.
    // If I have [1, 1, 2], "duplicates removed" might mean the set {1, 2}. 
    // Then for 1: count=2 (original frequency), sum=2? Or does it mean we treat them as unique items so count is always 1 and sum is value?
    
    // Let's re-read carefully: "それらのうち『重複を除いた整数』について、個数と合計を求めます。"
    // This phrasing is slightly ambiguous. 
    // Interpretation A: For each distinct number x found in the input, output its frequency (count) and total sum of all occurrences? That would just be count * value = sum. So why ask for both if they are dependent on original data?
    // Interpretation B: "Duplicates removed" implies we take the set of unique numbers present. For each such number x, what is 'count'? Maybe it's 1 (since duplicates are removed)? And 'sum' is just x? That seems trivial.
    
    // Let's look at similar problems or standard interpretations. 
    // Often "duplicate removal" in counting contexts means: Count how many times a unique item appears? No, that's the original count.
    // Maybe it means: Calculate sum and count for each distinct number x present in input.
    // Example Input: 1,2,3 -> Output: count=1 sum=1; count=1 sum=2; ... 
    // Example Input: 1,1,2 -> Unique are {1, 2}. For 1: original count is 2, value is 1. Sum of occurrences = 2*1 = 2? Count = 2?
    
    // Wait, if the instruction says "for integers with duplicates removed", it likely means we consider each unique integer as a separate entity where its 'count' is how many times it appeared in input (before removal logic applied to grouping), and sum is that count * value. 
    // BUT, maybe "duplicate removed" modifies what we are counting? Like if I have 1,2,3 -> distinct {1,2,3}. Count of each is 1. Sum is value.
    // If input is 1,1,2 -> Distinct {1,2}. 
    // Is it possible the user means: "For every unique integer x in the list, report how many times it appears (count) and what its total contribution to sum is"? That's redundant if count * value = sum.
    
    // Let's reconsider the phrase "重複を除いた整数" (integers with duplicates removed). 
    // Perhaps it means we filter out duplicate entries first? So 1,1,2 becomes just {1, 2}. Then for each element in this filtered list: count=1, sum=value.
    
    // Let's try another angle. Maybe "count" refers to the number of unique integers found so far? No.
    
    // Most logical interpretation given typical coding challenge patterns: 
    // Input: comma separated ints.
    // Process: Identify all unique numbers present in input.
    // For each unique number x:
    //   count = frequency of x in original input (how many times it appeared).
    //   sum = frequency * value? Or just the value itself if we consider "removed duplicates" as creating a set where each element is counted once?
    
    // Let's look at the example format `count=<n> sum=<m>`. 
    // If input: 1,2,3 -> Output could be count=1 sum=1; count=1 sum=2... (if duplicates removed means we only see each number once).
    // Or if input: 1,1,2 -> Unique are 1 and 2. For 1: appeared twice. If "duplicates removed" applies to the counting logic itself? 
    // Maybe it means: Count how many unique numbers there are in total (total count of distincts)? And sum them up? No, format is per item usually or aggregated?
    
    // Actually, re-reading Japanese carefully: "それらのうち『重複を除いた整数』について" -> Regarding the integers [that have duplicates removed]. 
    // This implies we are iterating over the set of unique numbers. 
    // For each such number x in that set:
    //   What is 'count'? If we took them from a list where duplicates were already gone, then count should be 1 for all? And sum = value? That seems too simple and ignores input frequency info which is usually the point of such problems.
    
    // Alternative interpretation (more likely in data processing): 
    // "For each unique integer x present in the input:"
    //   'count' = how many times it appeared originally? 
    //   'sum' = sum of its occurrences? Which is count * value.
    // But why output both if one derives from other? Unless... maybe 'sum' means something else? Or perhaps the problem implies we should output for each unique number: "count" (frequency) and "sum" (total contribution). 
    // Wait, could it be that we need to sum up all counts of numbers >= X or <= X? No.
    
    // Let's assume the simplest non-trivial interpretation:
    // We identify unique numbers present in input. For each such number x:
    //   count = frequency of x (how many times it was seen).
    //   sum = value * frequency. 
    // But wait, if I have 1,2,3 -> freqs are all 1. sums are same as values. Output: count=1 sum=1; count=1 sum=2...
    // If input is 1,1,2 -> Unique {1, 2}. 
    // For 1: freq=2, sum=2.
    // For 2: freq=1, sum=2.
    // Output lines? The problem says "output exactly one line". `count=<n> sum=<m>` is a single string with ONE count and ONE sum. 
    // Ah! It asks for TOTALS over the set of unique integers? Or aggregate stats?
    
    // Re-reading: "それらのうち『重複を除いた整数』について、個数と合計を求めます。"
    // Subject: The integers (with duplicates removed). i.e., the set U = {unique values}.
    // Task: Find 'count' and 'sum'. 
    // Does it mean count of elements in U? And sum of elements in U?
    // Example Input: 1,2,3 -> U={1,2,3}. Count=3 (size), Sum=6. Output: count=3 sum=6.
    // Example Input: 1,1,2 -> U={1,2}. Count=2, Sum=3. 
    // This makes sense! "Duplicates removed" creates a set of unique numbers. Then we calculate the size (count) and total value (sum) of this set.
    
    // Let's verify with constraints: "合計は 64bit 整数の範囲に収まります。" -> Sum fits in BigInt(64). 
    // If input is huge list of unique numbers, sum can be large. Count also up to N.
    // This interpretation (Count = number of distinct integers, Sum = sum of those distinct integers) fits the "one line output" requirement perfectly and uses all data logically without redundancy issues.

  const nums: string[] = [];
  
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    let n: number | null = parseInt(f, 10);
    // Handle cases where parse fails or is not a valid integer? 
    // "整数として解釈できない要素も無視します" -> Ignore elements that cannot be interpreted as integers.
    if (n === null || !Number.isFinite(n)) continue;
    
    const uniqueNums = new Set<number>();
  }

  // Let's restart the logic with correct flow:
  
  let seen = new Set<string>(); // Use string to handle potential formatting issues, though parseInt handles it. 
  // Actually better use number directly after validation.
  
  for (const f of s.split(",")) {
    const trimmed = f.trim();
    if (trimmed === "") continue;
    
    let n: number | null = null;
    try {
      n = parseInt(trimmed, 10);
    } catch {} // Should not happen with parseInt but safe check
    
    if (!Number.isFinite(n)) continue;

    seen.add(String(n)); // Store as string to avoid float issues? Integers are fine.
    
    // Wait, I need the count of unique numbers and sum of them.
  }

  const distinctValues = new Set<number>();
  for (const f of s.split(",")) {
    let n: number | null;
    try {
      n = parseInt(f.trim(), 10);
    } catch {} 
    if (!Number.isFinite(n) || isNaN(n)) continue;
    
    distinctValues.add(Number(n)); // Add as Number
  }

  const count = distinctValues.size;
  let sum: bigint = BigInt(0);
  
  for (const v of distinctValues) {
    sum += BigInt(v);
  }

  console.log(`count=${count} sum=${sum}`);
});
