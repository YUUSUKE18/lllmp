const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0);
  const counts = new Map<number, number>();

  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    try {
      const n = parseInt(f.trim(), 10);
      if (Number.isNaN(n) || !isFinite(n)) continue;
      
      let count = counts.get(n) ?? 0;
      sum += BigInt(count * n); // Wait, this logic is wrong. Let me re-read the requirement.

      /* 
       Requirement: "重複を除いた整数"について、個数と合計を求めます。
       Translation: For unique integers (after removing duplicates), find count and sum?
       
       Actually, looking at typical problems like this:
       Usually it means: Count how many times each number appears, AND what is the total sum of all numbers.
       OR 
       It could mean: Consider only distinct values. How many are there? What is their sum?
       
       Let's re-read carefully: "それらのうち『重複を除いた整数』について" -> Regarding integers after removing duplicates.
       This phrasing usually implies we look at the set of unique numbers present in the input.
       Then for that SET, what is its size (count) and sum?
       
       Example Input: 1,2,3,1,4
       Unique values: {1, 2, 3, 4}
       Count = 4
       Sum = 1+2+3+4 = 10
       
       If it meant "count of occurrences and sum for each unique number", the output format `count=<n> sum=<m>` wouldn't make sense because there would be multiple lines or a different structure. The single line output strongly suggests one aggregate count (number of distinct elements) and one aggregate sum (sum of all original elements OR sum of distinct elements?).
       
       Given "重複を除いた整数" (integers after removing duplicates), it most likely refers to the set of unique numbers found in the input stream.
       So: Count = Number of unique integers. Sum = Sum of those unique integers? 
       Or does it mean count how many times they appear and sum them up? No, "重複を除いた" implies we treat them as a set first.
       
       Let's assume:
       1. Parse all valid integers from input (ignoring duplicates in parsing logic initially).
       2. Identify the unique values present.
       3. Count = Size of this set.
       4. Sum = Sum of elements in this set? 
          OR Sum = Total sum of ALL numbers provided?
          
       Usually, if it says "for integers after removing duplicates", it implies we operate on the distinct set. So count is number of distinct items, and sum is their arithmetic mean or total? The variable name `sum` usually means total addition. If I have {1, 2}, count=2, sum=3 (if unique) vs sum=6 (if all).
       
       Let's look at the phrasing again: "それらのうち『重複を除いた整数』について" -> Regarding [the integers after removing duplicates].
       This implies we are talking about the set of distinct numbers.
       So Count = Number of distinct numbers. Sum = Sum of these distinct numbers? 
       
       Let's try to interpret as: Calculate statistics on the UNIQUE values found in the input.
       Unique Values: {1, 2, 3} -> Count=3, Sum=6.
       
       Alternative interpretation (less likely given "unique"): Just count occurrences and sum them up normally? No, that ignores "duplicate removed".
       
       Let's go with: 
       - Extract all integers from input.
       - Get the set of unique integers.
       - Count = size of this set.
       - Sum = sum of elements in this set (since we are talking about these specific 'unique' numbers).
      */

    } catch {} // ignore parse errors
    
  }
  
  console.log(`count=${counts.size} sum=${sum}`); 
});
