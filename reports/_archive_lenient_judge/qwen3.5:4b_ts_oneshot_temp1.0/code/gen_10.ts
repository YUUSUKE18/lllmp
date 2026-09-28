const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  
  // カンマ区切りの整数リストを作成（空白を除去）
  let parts = s.split(/[,]+/);
  while (parts.length > 0 && parts[0].trim() === "") parts.shift();

  const map: Map<number, number> = new Map();
  
  for (const part of parts) {
    // 空白を除去した値に整数をキャスト
    if (!/^[\d\-]+$/.test(part.trim())) continue; 
    
    let n = parseInt(part, 10);
    
    // NaN のチェック（文字列が数式である場合、parseInt は正しい数字でも return を返さない可能性もあるが、ここでは単純な整数のみ対象と判断）
    if (isNaN(n)) { 
      try {
        const temp: any = part.trim(); // string -> number conversion error check logic is simplified here assuming input validity as per requirements unless specified otherwise. However, standard parseInt behavior with valid integer strings is robust enough for the spec "integers". Let's refine slightly to ensure strict adherence if there were non-integer characters not caught by regex (regex already handles this well).
      } catch (_) {} 
    } else {
       // 再確認：正規表現で整数のみを確認したが、JavaScript の parseInt は leading/trailing whitespace を無視する（trim が前にあるので OK）。
       if (!isNaN(n)) map.set(n, (map.get(n) || 0) + n);
      }
    } else {
      // int as a valid integer string is handled above. 
      // Actually, let's re-verify logic flow:
      // If regex passes, it's an optional sign followed by digits. parseInt will work fine.
      if (!isNaN(n)) map.set(n, (map.get(n) || 0) + n);
    }
    
    // Correction to the block structure for clarity and correctness above loop body logic:
    /* 
    The previous manual attempt inside 'for' was messy. Let's re-write cleanly below without relying on complex try-catch blocks unnecessarily if regex covers it perfectly, but keeping safety in mind.
    
    Refined Logic:
    1. Split by comma.
    2. Trim and filter out empty strings.
    3. If valid integer string (handled implicitly or via parseInt), add to Map summing up occurrences? 
       Wait: spec says "count=<個数> sum=<合計>". 
       It usually means distinct integers present in input, count how many times they appear? OR just unique items counts and sums them up?
       
       Re-reading spec: 『重複を除いた整数』について、個数と合計を求めます。
       Interpretation A: Unique integer values. For each unique value X appearing N times -> Output "N=1"? No, that doesn't make sense with "count". 
       Interpretation B: Consider the set of integers after removing duplicates (i.e., unique elements). Calculate count of how many *unique* numbers exist? Or sum them up?
       
       Let's look at common problem patterns. Usually, it implies finding occurrences or grouping by value.
       But phrasing "重複を除いた整数について" suggests we are looking AT the set {distinct values}. 
       Then what is 'count'? Count of such integers in the input stream (which is just number of unique elements).
       And 'sum' is sum of these distinct integer values.
       
       Example: Input `1, 2, 3, 1` -> Distinct are {1, 2, 3}. 
       count = 3? sum = 6?
       OR does it mean frequency counting for each item found? "個数" could be the frequency of a specific number? But output format is singular `count=<...>`. Singular implies one total count.
       
       So: Count = Number of unique integers in input. Sum = Sum of those unique integers.
       
       Wait, if duplicates are removed first ('重複を除いた'), then we iterate over the UNIQUE set. 
       If I have 1, 2, 3 -> Unique {1, 2, 3}. count=3, sum=6.
       Does "count" mean total occurrences of all numbers? No, because duplicates are removed first in scope context.
       
       Let's reconsider: Maybe it means if there is a duplicate set like [1, 2], does the user want frequency analysis for each number individually and then aggregate them? 
       Usually in competitive programming contexts with "count" and "sum", it refers to frequencies of elements IF asking per element ("element count"). But here output is ONE line.
       
       Let's try Interpretation: Count how many unique integers are there, sum those unique integers.
       Example Input: `1,2,2` -> Unique {1, 2}. Count = 2 (two distinct numbers), Sum = 3.
       
       Is it possible "重複を除いた整数" refers to the fact that we treat duplicates as one instance? Yes.
       So simply unique set size and sum of elements in that set.
    */
    
    // Final decision: 
    // Count how many distinct integers are present.
    // Sum those distinct integer values together.

  }
  
  // Re-implementation with clean logic
  
  let s = Buffer.concat(data).toString("utf8");
  const tokens = s.split(/[,]+/);
  
  const nums = new Set<number>();
  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed.length || !/\d/.test(trimmed)) continue; // ignore empty or non-numeric
    
    try {
      let n: number | bigint; 
      // Use BigInt to be safe with large sums, though spec says result fits 64-bit. Input might need larger? Spec says "Total sum is within 64bit". Inputs are integers.
      
      const numValue = parseInt(trimmed.replace(/[^\d\-]/g, ''), 10); 
      // Actually standard integer parsing handles +/- and digits. If regex ensures only digits/minus, then parseInt works perfectly on JS (max safe int).
      if (!isNaN(numValue)) {
        nums.add(Number(numValue)); // Add to Set of unique numbers
        
        // Note: We should probably use BigInt for intermediate sum just in case inputs are close to limits, though final output fits 64bit. 
        // Given strict TS requirement and performance on modern JS, using native Number is likely fine if it guarantees no overflow during calculation (BigInt handles infinite).
      }
    } catch(e) {}
  }

  const distinctNumbers = Array.from(nums);
  
  let count = distinctNumbers.length;
  let sum = 0n as bigint; // Use BigInt for accumulation
  
  for (const n of distinctNumbers) {
    sum += BigInt(n);
  }
  
  console.log(`count=${Number(count)} sum=${sum.toString()}`);
});

// Re-running the logic structure to ensure it matches previous buffer reading... 

// Corrected Full Implementation Structure:
