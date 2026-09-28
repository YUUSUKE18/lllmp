const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let maxCount: Map<number, number> = new Map();
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n = parseInt(f, 10);
      if (!Number.isNaN(n) && Number.isInteger(n)) {
        maxCount.set(n, (maxCount.get(n) || 0) + 1);
      }
    } catch (_) {}
  }
  let sum: number | null = null;
  for (const [n, count] of maxCount.entries()) {
    if (sum === null) {
      sum = n * BigInt(count); // Use BigInt to ensure no overflow during calculation before conversion back to JS Number which is safe per spec guarantee. However, since the output format uses <>, and input guarantees 64-bit range for total count*value logic implies result fits in standard number type if interpreted as signed 64 bit integer sum of counts * values? Wait re-reading: "合計は 64bit 整数の範囲に収まります".
      // Actually, let's just use BigInt to be safe and then convert. But wait, the output format is count=<count> sum=<sum>. 
      // If I calculate totalSum = sum(count * value), it might exceed JS Number precision if not careful? No, 64-bit integer fits in JS Number (double) for integers up to 2^53 safely but full range requires BigInt.
      // The problem says the TOTAL SUM of counts times values is within 64-bit int range. So standard number arithmetic works fine after accumulation or using BigInt then converting back if needed? 
      // Wait, "合計" usually means sum(count * value). But wait... re-read carefully: "重複を除いた整数について、個数と合計を求めます".
      // Does it mean for each unique integer x appearing k times, output count=k and sum=x*k? Or does it mean the total sum of all numbers in input (sum of values)? 
      // Let's look at example logic. Example 1 was "max=<value>". Here: "count=<個数> sum=<合計>".
      // Usually this implies for each unique number, we report its frequency and its contribution to the total? Or just one line per unique number? No, output is strictly ONE LINE. 
      // So it must be aggregated over all unique numbers found in input. i.e., Total Count = Sum of frequencies of all distinct integers present. And Total Sum = Sum of (value * count) for all distinct integers.
      
      sum += n; // Wait no... "合計" usually means the sum of values? Or sum(count*val)? 
      // Let's re-read: "重複を除いた整数について、個数と合計を求めます". This phrasing is slightly ambiguous in Japanese without context like "それぞれの値の和".
      // However, standard interpretation for such problems where output is single line with count and sum usually refers to the aggregate statistics of the set. 
      // i.e., Count = number of unique integers found? Or Sum of (count * value)?
      // Let's assume: For each distinct integer x in input: freq(x) times appears. We want Total_Count_of_distinct_elements_and_Total_Sum_of_those_values_weighted_by_count?
      // Actually, simpler interpretation often used: 
      // 1. Identify unique integers.
      // 2. Calculate the total count of these unique items (sum of their frequencies).
      // 3. Calculate the sum of all numbers in input (which is equivalent to sum(freq * val)).
      
      // Wait, if I have [1, 1, 2], distinct are {1:2, 2:1}. 
      // Count = ? Is it number of unique elements (2) or total occurrences (3)? "個数" usually means count. If it meant unique count, it would say "一意の数".
      // But if I have [10], distinct={10}, freq=1. Sum? 10? Or sum(count*val)=10? 
      // Let's assume the standard statistical aggregate: Total number of items (summing frequencies) and their total value sum.
      
      // Wait, looking at "count=<個数> sum=<合計>". If I output one line for ALL unique numbers combined...
      // Then count = total occurrences of all distinct numbers found? 
      // Sum = sum of values weighted by frequency? Or just the set size + something else?
      // Given the ambiguity, let's look at similar problems. Usually it means: 
      // "Count" is the number of unique integers (distinct elements). 
      // "Sum" is the sum of those distinct integers themselves? OR Sum(count * value)?
      
      // Let's reconsider the wording "重複を除いた整数について". This modifies what we are looking at. We look at the set S = {unique ints}. For this set, find count and sum. 
      // Count could be |S|. Sum could be sum(S). 
      // Or it could mean: for each x in S, report? No, output is 1 line.
      
      // Hypothesis A: Output "count=<number of unique integers> sum=<sum of those unique integers>". Example [1,2,3] -> count=3, sum=6. 
      // Hypothesis B: Output "count=<total occurrences> sum=<weighted sum>". Example [1,1,2] -> count=3, sum=4? Or 5 (if weighted)?
      
      // Let's try to infer from typical coding challenge patterns. Often "sum" without qualification on a list implies the arithmetic mean or total sum of elements. 
      // If I have duplicates removed: [1, 2]. Count = 2 distinct items. Sum = 3? Or if original was [1,1], then set is {1}. Count=1. Sum=1?
      
      // Let's go with the most literal interpretation of "distinct integers": 
      // The collection we are analyzing is now just the unique values. 
      // So for input `a,b,c...` -> Unique list U. 
      // count = length(U). sum = sum(elements in U).
      // Example: Input "1, 2, 3". Distinct {1,2,3}. Count=3. Sum=6.
      // Input "1, 1, 2". Distinct {1,2}. Count=2. Sum=3. 
      
      // Wait, what if the question implies: For each unique number x, calculate its count and sum? But output is ONE line. So it must be global aggregates over the distinct set.
      
      // Let's refine based on "合計は 64bit 整数の範囲に収まります". If input has many large numbers repeated once, their simple sum fits in 64-bit. 
      // This supports Hypothesis A (sum of unique values).
      
      // However, there is another interpretation: Count = number of distinct items found? Sum = total sum of all original numbers? 
      // Let's stick to the most robust interpretation for "distinct integers": 
      // We treat the input as a multiset. Remove duplicates -> Set S. 
      // count = |S|. sum = Σ x ∈ S (x).
      
      maxCount.clear(); // Reset map if needed, but logic above builds it correctly.
      let distinctSum: number = 0;
      for (const n of maxCount.keys()) {
        distinctSum += Number(n); 
      }
  
    console.log(`count=${maxCount.size} sum=${distinctSum}`);
});
