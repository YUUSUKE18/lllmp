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
      counts.set(n, count + 1);
      sum += BigInt(n);
    } catch {
      // parseInt が失敗した場合も無視する（例: "abc"）
    }
  }

  const sortedKeys = Array.from(counts.keys()).sort((a, b) => a - b);
  
  let outputStr = "";
  for (const n of sortedKeys) {
    if (outputStr.length > 0) outputStr += " ";
    outputStr += `${n}:${counts.get(n)}:${sum}`; // ここは少し変えて、各整数ごとに出力する必要があるか？仕様再確認。

    /* 
      修正: 指定どおり「個数と合計」を求めます。
      「それらのうち『重複を除いた整数』について」という表現から、
      一意の整数に対してその出現回数をカウントし、それを足した値（合計）を求めるのか？
      それとも各整数ごとに「count, sum_of_that_number」を出すのか？

      例文: "1,2,3" -> count=1 each? sum = 6? 
      または "1,1,2,2" -> (cnt=2,sum=2), (cnt=2,sum=4)? 

      再読解: 「それらのうち『重複を除いた整数』について、個数と合計を求めます。」
      これは「一意の値に対して」その出現回数をカウントし、それを足すのか？ 
      それとも「各グループ（一意の値）ごとに count と sum を出力する」のか？

      通常此类题目的意思是：对于每个唯一的数字，输出它的出现次数和它自己的值之和。
      但是题目说“合計を求めます”，如果是多个不同的数，总和是多少呢？
      
      让我们看最合理的解释：输入是整数列表。我们需要找出所有不重复的整数（即去重后的集合）。
      对于每一个这样的唯一整数 x:
        count = x 出现的次数
        sum_x = x * count (或者仅仅是 x? "合計"通常指累加和) -> 应该是 x * count
        
      但是输出格式呢？题目没说多个数之间怎么分隔。
      
      再看一遍：“個数と合計を求めます” - 求个数和总和。
      “標準出力へ、厳密に `count=<個数> sum=<合計>` という 1 行（末尾に改行）だけを出力します。” -> **只输出一行**。

      这意味着：我们需要计算所有唯一整数的总出现次数，以及所有这些整数值的总和？
      
      或者：输入 "1,2,3"。去重后是 {1, 2, 3}。
      count = 3 (每个数出现一次) -> 还是 total count? 
      sum = 6.

      如果是 "1,1,2,2"。去重后 {1, 2}.
      Count: 1出现了2次，2出现了2次。Total unique items count? Or per item?
      
      让我们尝试最字面的理解：
      “重複を除いた整数” -> Unique integers. 
      “個数と合計を求めます” -> Find the count and sum of these unique integers.
      
      Case A: Input "1,2,3". Unique: [1, 2, 3]. Count = 3 (number of unique items). Sum = 6. Output: count=3 sum=6.
      Case B: Input "1,1,2,2". Unique: {1, 2}. 
              If we treat them as a set: Size is 2. Sum is 1+2=3? Or 1*2 + 2*2 = 6?
      
      通常这种题目如果是“求和”，是指所有数字的和。如果强调“去重后的整数”，可能是指集合的大小（count）和集合元素的和（sum）。
      
      但是，如果有重复呢？"1,1,2". Unique: {1, 2}. 
      Count (unique count) = 2. Sum (of unique values) = 3? Or sum of all elements in the list that are unique? That's just total sum.
      
      让我们假设最简单的逻辑：
      1. 解析输入，得到所有整数。
      2. 过滤掉重复的（即只保留唯一的值）。
      3. Count = 唯一值的数量 (Number of distinct integers).
      4. Sum = 这些唯一整数的和 (Sum of the unique integer values themselves, i.e., sum(set)). 
         OR Sum = 所有整数之和？如果是后者，去重就没意义了。所以应该是 Unique Values' Sum.

      Let's try this interpretation:
      Input "1,2,3" -> Distincts: [1, 2, 3]. Count=3, Sum=6. Output: count=3 sum=6.
      Input "1,1,2,2" -> Distincts: {1, 2}. Count=2, Sum=3 (1+2). 
      
      Wait, what if the user meant "For each unique number, output its frequency and value"? But the output format says ONLY ONE LINE.
      So it must be aggregate stats of the set of unique numbers.

      Let's refine:
      - Parse integers from input.
      - Get a Set of these integers (removes duplicates).
      - Count = size of this Set.
      - Sum = sum of elements in this Set.
      
      Example 1,2,3 -> count=3, sum=6.
      Example 1,1,2,2 -> set={1,2}, count=2, sum=3.

      Is it possible "合計" means the sum of all numbers in the input? 
      If so: Input "1,1,2". Sum = 4. Count (unique) = 2.
      
      Let's look at similar problems or standard interpretations. Usually "sum of unique elements" implies adding each distinct element once.
      However, sometimes it means summing up the occurrences? No, that would be total sum regardless of uniqueness logic for count/sum definition unless specified per group.

      Given the constraint "1 line only", and "count=<n> sum=<m>", I will assume:
      Count = Number of distinct integers found in input.
      Sum = Sum of those distinct integer values (each unique value added once).

      Wait, re-reading carefully: "それらのうち『重複を除いた整数』について、個数と合計を求めます。"
      Subject: The integers after removing duplicates from the list.
      Task 1: Find count (of these subject items). -> Size of unique set.
      Task 2: Find sum (of these subject items). -> Sum of elements in unique set.

      Let's code this logic. It fits "one line" perfectly and makes sense mathematically for a set derived from the list.
      
      Wait, could it be that we need to output per number? 
      No, "1行だけ出力します". If there are multiple numbers, how do they fit in one line with `count=... sum=...` format? There is only one pair of count and sum variables defined in the template.
      
      So: Count = Total distinct integers found. Sum = Sum of those distinct integers (1+2+3).

      Let's double check if "合計" could mean something else. 
      If input is 1, 1, 1. Unique: {1}. Count=1. Sum=1? Or Sum=3?
      Usually "sum of unique elements" means sum(set) = 1.
      
      Let's proceed with this interpretation.

    */
    
    // Re-evaluating based on typical coding challenge patterns...
    // Actually, maybe it implies: For each distinct number x in the input list:
    //   count(x) is how many times x appears? 
    //   sum(x) ... wait, if we output one line for ALL of them, what are 'count' and 'sum'?
    
    // Hypothesis 2: The problem asks to calculate statistics on the UNIQUE set.
    // Count = Number of unique integers.
    // Sum = Sum of these unique integers (e.g., {1, 2} -> sum=3).

    // Let's implement this. It is robust and fits the "one line" constraint best.
    
    const distincts = new Set<number>();
    for (const f of s.split(",")) {
      if (!f.trim()) continue;
      try {
        const n = parseInt(f.trim(), 10);
        if (Number.isNaN(n) || !isFinite(n)) continue;
        distincts.add(n);
      } catch {}
    }

    // Calculate count and sum of the unique set elements themselves.
    let c = BigInt(distincts.size);
    let s = 0n; 
    for (const n of distincts) {
      s += BigInt(n);
    }

    console.log(`count=${c} sum=${s}`);
});
