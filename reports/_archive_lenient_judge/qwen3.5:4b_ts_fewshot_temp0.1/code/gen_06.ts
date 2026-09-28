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
      if (isNaN(n) || !Number.isInteger(n)) continue;
      
      count.set(n, (count.get(n) ?? BigInt(0n)) + 1n);
      sum += count.get(n)! * BigInt(1n); // This logic is slightly flawed in the thought process above. Let's correct it: we need to iterate unique numbers and add their counts? No, "個数と合計" usually means for each number (count of that specific number) or total distinct count vs sum of all values?
      // Re-reading spec: '重複を除いた整数'について、個数と合計を求めます。
      // Interpretation A: For the set of unique numbers, output Total Count and Sum.
      // Example Input: 1,2,3 -> Unique: {1,2,3}. Count=3 (distinct items), Sum=6? Or does it mean count per number? 
      // The example format is `count=<個数> sum=<合計>` which implies a single line with two values.
      // If input was 1,1,2 -> Unique: {1,2}. Count of unique numbers = 2. Sum of all numbers (including duplicates) = 3? Or Sum of distinct numbers = 3? 
      // Usually "個数" in this context means the number of distinct elements found.
      // And "合計" usually means sum of ALL input values, or sum of distinct values? Given "重複を除いた整数について", it likely refers to properties OF that set.
      // Let's assume: Count = Number of unique integers. Sum = Sum of all provided integers (standard interpretation unless specified 'sum of distinct'). 
      // Wait, if I have 1,2,3 -> Unique {1,2,3}. Count=3. Sum? If duplicates existed like 1,1,2 -> Unique {1,2}. Count=2. Sum could be 4 (all) or 3 (distinct).
      // Let's look at the phrasing again: "それらのうち『重複を除いた整数』について、個数と合計を求めます。" 
      // It asks for properties OF the unique integers. So likely Count = size of set, Sum = sum of elements in that set (which is same as total sum if we consider distinct values only? Or all?).
      // Actually, a common interpretation in such problems: "Count how many unique numbers there are" and "What is their sum". 
      // If input 1,2,3 -> Unique {1,2,3}, Count=3, Sum=6.
      // If input 1,1,2 -> Unique {1,2}, Count=2, Sum=3 (distinct) or 4 (total)? "重複を除いた整数" implies we are looking at the set of unique numbers. The sum of a set is usually just adding its elements once. 
      // However, often in competitive programming contexts without further clarification:
      // Option 1: Count distinct items, Sum all items.
      // Option 2: Count distinct items, Sum distinct items (which equals total if no duplicates).
      // Let's assume the most logical interpretation of "properties of unique integers": 
      // The set is {unique numbers}. Size = count. Sum = sum(unique numbers).
      // But wait, what about input like 10,20,30? Unique={10,20,30}, Count=3, Sum=60. Same as total.
      // Input: 5,5,5. Unique={5}. Count=1. Sum=5 (distinct) or 15 (total)? 
      // "重複を除いた整数" -> The integers after removing duplicates. So the list becomes [5]. Then count is 1, sum is 5.
      // This seems the most consistent with the phrase "について". We are analyzing the filtered set.
      
      const uniqueNums = new Set<number>();
    } catch (e) { /* ignore */ }
    
    // Let's restructure logic to be clear: 
    // 1. Parse all valid integers into a list, handling duplicates naturally by keeping them for sum? Or filter first?
    // "重複を除いた整数" -> Filter the input array to remove duplicates FIRST. Then calculate count and sum on this new filtered array.
    
    const nums = s.split(",").map(t => {
      if (!t.trim()) return null;
      try {
        const n = parseInt(t.trim(), 10);
        if (isNaN(n)) return null;
        return n;
      } catch {}
    }).filter(x => x !== null) as number[];

    // Filter unique first? Or just use a Set to track seen.
    const distinctNums = new Set<number>();
    for (const num of nums) {
      if (!distinctNums.has(num)) {
        distinctNums.add(num);
      }
    }
    
    count = distinctNums.size; // Number of unique integers
    
    let sumVal = 0n;
    for (const n of distinctNums) {
      sumVal += BigInt(n);
    }

    console.log(`count=${count} sum=${sumVal}`);
});
