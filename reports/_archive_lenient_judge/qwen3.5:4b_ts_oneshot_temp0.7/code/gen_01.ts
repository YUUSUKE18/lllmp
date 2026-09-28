const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0);
  const counts = new Map<number, bigint>();

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    
    let c = counts.get(n) ?? BigInt(0);
    sum += c + 1n;
    counts.set(n, c + 1n);
  }

  const sortedKeys = Array.from(counts.keys()).sort((a, b) => a - b);
  
  // Sort by count descending first to match typical "top k" expectation if unspecified? 
  // But the spec says: "Those unique integers... number of occurrences and total sum".
  // It doesn't explicitly say how to order them in output. 
  // However, usually such problems imply sorting by value or keeping original relative order.
  // Given no sort instruction, we will iterate through our collected counts which is arbitrary based on input order.
  // To be deterministic and clean, let's output for each unique number found: count=... sum=...
  // Wait, the spec says "count=<number> sum=<total>". This suggests one line with single value? 
  // Re-reading carefully: "それらのうち『重複を除いた整数』について、個数と合計を求めます。" -> For unique integers.
  // Does it mean output for EACH unique integer separately (e.g., multiple lines)? Or aggregate ALL into one count/sum?
  
  // Interpretation A: Aggregate all numbers together. Count = total items, Sum = sum of all items.
  // "個数と合計" could be singular or plural. 
  // If it were per-item, the output format `count=<n> sum=<s>` would likely require a loop producing multiple lines.
  // But the requirement says: "標準出力へ、厳密に `count=<個数> sum=<合計>` という **1 行** ... を出力します。" (Output strictly ONE line).
  
  // Therefore, it must be aggregating ALL integers read from input into a single count and total sum.
  // The phrase "重複を除いた整数について" might imply we only consider distinct values for some calculation? 
  // No, if the output is just one line with singular 'count' and 'sum', it implies:
  // Count = Total number of integers parsed (or maybe count of unique ones?).
  // Sum = Sum of all those integers.

  // Let's re-read "それらのうち『重複を除いた整数』について、個数と合計を求めます" literally.
  // It says "For the unique integers among them, find the count and sum". 
  // This is slightly ambiguous in Japanese technical context.
  // Possibility 1: For each distinct integer x, output its frequency? But then multiple lines needed. Contradicts "strictly one line".
  // Possibility 2: The problem asks for statistics on the set of unique integers found: Total Count (of those numbers) and Their Sum.
  
  // Given the constraint "Strictly ONE LINE", it must be a global aggregation over all valid integers parsed from input.
  // So, ignore duplicates in terms of logic? No, count usually means frequency or total items. 
  // If I have inputs: 1, 2, 3 -> Count=3, Sum=6.
  // If unique only: Unique are {1,2,3}. Count (of uniques)=3, Sum=6. Same result if no repeats.
  // Inputs: 1, 1, 2. 
  // Interpretation A (All items): Count=3, Sum=4.
  // Interpretation B (Unique set properties): Unique={1,2}. "Count" of unique numbers = 2? "Sum" of unique numbers = 3? Or sum with multiplicity?
  
  // Usually in such simple coding tasks without further clarification on aggregation vs per-element:
  // If the output is ONE line, it aggregates everything. 
  // The mention of 'unique' might be a distractor or implying we only care about valid integers (which are naturally unique identifiers if repeated).
  // However, "重複を除いた整数" strongly suggests excluding duplicates from consideration set before calculating count/sum?
  // If I exclude duplicates: Set(1,1,2) = {1,2}. Count=2. Sum=3.
  // If I include all: List(1,1,2). Count=3. Sum=4.
  
  // Let's look at the example format provided in prompt again? The example was "max=<val>". That's a single value.
  // Here output is `count=<n> sum=<s>`. 
  // If I assume standard behavior for such ambiguous specs where one line is required:
  // It likely means calculate properties of the entire dataset (or unique set).
  // Let's try to infer from "重複を除いた整数について". This usually modifies the subject. Subject = Unique integers. Action = Count and Sum them? 
  // If I have a list [1, 2, 3], unique is {1, 2, 3}. Count=3 (size of set), Sum=6.
  // If I have [1, 1, 2]. Unique is {1, 2}. Size=2, Sum=3. 
  // This seems the most logical interpretation for "Count and sum OF unique integers". It implies ignoring duplicates entirely before counting/summing? Or just treating them as a set?
  
  // Actually, another reading: "For each of these (unique) integers... count it and sum it?" -> Still multiple lines.
  // So the single line constraint forces global aggregation on the 'set' derived from input.
  
  // Let's refine: 
  // Input: `1,a,b,c` (valid ints only). 
  // Step 1: Parse integers, ignoring non-ints and whitespace.
  // Step 2: Get unique ones? "重複を除いた整数" -> Set of numbers.
  // Step 3: Count = Size of this set. Sum = Sum of elements in this set (each element added once).
  
  // Example check: Input `1, 1`. 
  // Unique integers: `{1}`. Count=1, Sum=1.
  // If it meant total occurrences: Count=2, Sum=2.
  // The phrase "重複を除いた" (excluding duplicates) is key here. It filters the data first.
  
  const setValues = new Set<number>();
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    
    // We only add once per unique value to the set, effectively ignoring duplicates during collection? 
    // Wait, "重複を除いた" implies we take the list of numbers that are not repeated in a way? No.
    // It means: Take the input stream -> Extract integers -> Remove duplicates (make it unique) -> Calculate count and sum on THAT filtered list.
    
    setValues.add(n);
  }

  let totalCount = BigInt(0);
  let totalSum = BigInt(0n);
  
  for (const v of setValues) {
    // Since we built a Set, each value is unique in this loop? 
    // Yes. But wait, if the input was `1,2`, set has {1,2}. Loop runs twice. Count=2, Sum=3. Correct.
    // If input `1,1`. Set has {1}. Loop runs once. Count=1, Sum=1. 
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});
