const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let maxVal: bigint | undefined; // Used for sum, initialized as negative infinity logic via first element or default handling. Actually, we can use a BigInt literal for safety if needed but simpler to handle accumulation.
  
  // We need to parse integers and track unique ones with their counts and sums.
  // Since duplicates are removed from the "set of numbers" before counting? 
  // Wait, the problem says: 『重複を除いた整数』について、個数と合計を求めます。
  // This usually means: For each unique integer value present in the input, calculate how many times it appears (count) and what is its total sum.
  
  const numbers = new Map<number, number>();

  for (const word of s.split(/[,,\s]+/)) {
    if (!word.trim()) continue; // Skip empty elements
    
    try {
      const numStr = word.trim();
      const n = parseInt(numStr); // Assuming standard integer parsing is sufficient as per "64bit sum" constraint hint, but input integers themselves might fit in 32-bit or larger. The prompt implies the SUM fits in 64-bit. Let's assume inputs are within safe ranges for JS Number (53 bits precision) unless they exceed it.
      // However, to be strictly correct with "integer sequence" and potential large inputs leading to 64-bit sum, we should parse as BigInt if necessary or use a robust parser.
      // Given the example used parseInt, let's assume input integers are standard JS numbers first. 
      // But wait, if an input is like "9007199254740993", it fits in 64-bit but loses precision as Number when multiplied? No, parsing itself keeps value, multiplication might lose precision for very large counts * values.
      // To be safe with BigInt sum requirement: let's parse inputs carefully or use a library-free approach that handles potential overflow of intermediate calculations by using BigInt arithmetic if the count becomes huge or numbers are large.
      
      // Let's re-read: "合計は 64bit 整数の範囲に収まります" (The total sum fits in 64-bit integer range). 
      // This implies we don't necessarily need to handle inputs larger than what JS Number can hold accurately, but the accumulated sum must be precise.
      // Standard parseInt returns a Number. If input > MAX_SAFE_INTEGER, it becomes inaccurate immediately upon parsing as a String->Number conversion in JS if not handled via BigInt initially? 
      // Actually `parseInt` parses based on radix 10 and stops at non-digits. It does NOT convert the whole string to a float unless you do operations. Wait, `parseInt("9e25")` works differently than just digits.
      // Let's assume standard inputs are reasonable integers that can be parsed as Number without immediate loss of precision for individual elements, but their sum might exceed 2^53 - 1 if we rely on JS Number addition? 
      // No, the constraint says THE SUM fits in 64-bit integer. This implies the result is a valid signed 64-bit integer (approx +/- 9e18).
      // The maximum safe precision for JS Number is approx 2^53 (~9e15). If individual numbers are small but count is large, or vice versa, we might lose precision with `Number`.
      // To be strictly correct and avoid any floating point issues (though unlikely given the problem statement's constraints on the final sum), using BigInt for parsing and accumulation is safer if inputs could theoretically exceed 2^53. 
      // But standard `parseInt` returns a Number. If I convert that to BigInt, it works perfectly fine as long as the input string represents an integer < MAX_SAFE_INTEGER? No, even large integers can be represented exactly in JS Numbers up to 9e18 if they are exact powers of two sums etc., but generally only integers within +/- 2^53 are guaranteed safe.
      // To ensure correctness regardless: I will parse the string into a Number first (since input is likely reasonable), then use BigInt for accumulation? 
      // Actually, let's just parse as String -> Number -> convert to BigInt if needed during summing? Or simply accumulate in BigInt from start if we assume inputs might be large.
      
      // Simpler approach: Parse as string token, try parseInt(Number). If it fits reasonable range, use it. Then for the map values (count), also treat them as numbers initially but convert to BigInt when computing sum or storing? 
      // Let's just store count and value in Map<String, {c: number, s: bigint}> ?
      
      const val = parseInt(numStr);
      if (!isFinite(val)) continue;

      let bVal = Number.isInteger(Number(BigInt(String(val)))) ? BigInt(val) : NaN; // Just to be sure we treat it as a big int conceptually. 
      // Actually, simply: `const v = val`. Then when adding to sum, convert to BigInt?
      
      if (numbers.has(val)) {
        numbers.set(val, numbers.get(val)! + 1);
      } else {
        numbers.set(val, 1n); // Initialize count as BigInt immediately for safety in accumulation logic below.
      }

    } catch (_) {} 
  }

  let totalSum = 0n;

  const sortedValues: number[] = [];
  
  for (const [key] of numbers) {
     if (!Number.isNaN(key)) { // Should always be true from parseInt unless weird input, but safe check.
        sortedValues.push(Number(key)); 
    } else continue;
  }

  // Calculate sum using BigInt to ensure precision up to 64-bit range (and beyond temporarily) then cast? No, just keep as bigint and print string representation of the number part.
  
  for (const [val] of sortedValues) {
      const count = numbers.get(val);
      if (!count || Number.isNaN(count)) continue; // Should not happen
      
      let sumPart = BigInt(val); 
      
      // If val is very large, converting to string then back might be tricky but parseInt handles it.
      // Let's just rely on the fact that we need a 64-bit integer result.
      
      for (let i = 0n; i < count! ; i++) {
        sumPart += BigInt(val); 
      }
      totalSum += sumPart;
  
    console.log(`count=${sortedValues.length} sum=${totalSum}`); // Wait, the output format is `count=<個数>`. Does it mean unique count or total count? "重複を除いた整数" -> Unique integers. So count should be number of UNIQUE values. Sum is their sum (each added once per occurrence).
  }

// Correct Logic: 
// 1. Identify all unique numbers present in the input.
// 2. For each unique number, determine its frequency (count) and contribution to total sum.
//    Actually "個数" usually refers to the count of that specific integer value? Or just how many such integers exist?
//    Re-reading: 『重複を除いた整数』について、個数と合計を求めます。
//    Interpretation A: For each unique number X, output (count_of_X) and (sum_of_all_occurrences_of_X). 
//              But the problem asks for a SINGLE line `count=<n> sum=<s>`. This implies one aggregate count? Or is it asking to list them? No "1 行だけ".
//    Interpretation B: Count how many UNIQUE integers are there (size of set), and what is their total sum.
//             Example Input: 1, 2, 3 -> Unique: {1,2,3}. Count=3. Sum = 1+2+3=6? Or count of occurrences? 
//    "重複を除いた整数" modifies the subject. We are looking at the set of unique integers.
//    For this SET, we calculate its size (count) and sum (sum).
//    So if input is `10, 20, 30, 40`, output: count=4, sum=10+20+30+40=100.
//    If input is `10, 10, 20`, unique are {10, 20}. Count=2 (unique items). Sum = 10 + 20? Or does it sum all occurrences of those numbers found in the list? 
//    Usually "合計" on a set implies summing the elements themselves. If I have duplicates removed, do I count them once or multiple times based on original frequency?
//    Phrasing: "重複を除いた整数について...個数と合計". 
//    Contextual guess: It likely means take the list of unique numbers found (e.g., {10, 20}), then calculate how many are there (count) and sum them up. If we had `10, 10`, unique is just `10`. Count=1, Sum=10? Or does it mean "For the set of unique values present in the input list"?
//    Let's assume: 
//      Unique Set U = {v | v exists in input}.
//      count = size(U).
//      sum = sum_{u in U} (count(u) * u)? Or just sum(u for u in U)? 
//    Given "個数" and "合計", if we say "For these unique numbers, what is their quantity and total?", it usually implies the mathematical properties of that set.
//    However, often such problems imply: Count how many distinct items are there? And Sum all occurrences of those items (which is just sum of original list)? 
//    Let's look at similar competitive programming patterns. Usually "distinct integers" -> count them individually and maybe their sums if grouped by value. But here it asks for ONE line with single values `count` and `sum`.
//    
//    Scenario: Input `1 2 3 4 5` (all unique). Unique set = {1,2,3,4,5}. Count=5. Sum of what? If sum of the numbers in the list (which is same as sum of unique since all are distinct), then count=unique_count, sum=list_sum.
//    Scenario: Input `1 1 2`. Unique set = {1, 2}. 
//      Option A: Count=2 (number of unique values). Sum = 3 (sum of the numbers in the set)? Or Sum = 4? (Sum of all elements in original list which equals sum of count*value for each value?).
//    The phrase "重複を除いた整数" suggests we are operating on a filtered sequence: `[1, 2]`. Then calculate size and sum. Size=2, Sum=3. 
//    This interpretation (summing the unique values themselves) is consistent with removing duplicates first.
    
  // Let's refine logic based on "Remove duplicates -> Get new list -> Count items in new list + Sum items in new list".
  
  const distinctValues = [];
  for (const word of s.split(/[,,\s]+/)) {
    if (!word.trim()) continue;
    try {
      let n = parseInt(word.trim());
      // Check validity again to be safe with edge cases like "1.0" which isn't integer in strict sense? 
      // The prompt says integers. `parseInt` handles leading zeros etc but might return NaN if non-integer chars are present before digits? No, just parse int part.
      if (!Number.isNaN(n)) {
        distinctValues.push(Number(n));
      } else continue;
    } catch (e) {} 
  }

  // Remove duplicates from the collected numbers to form the "unique sequence"
  const uniqueNumbers = [...new Set(distinctValues)]; 
  
  let cnt = uniqueNumbers.length;
  let sumVal: bigint | number = 0n; // Use BigInt for accumulation safety
  
  for (const v of uniqueNumbers) {
    if (!Number.isFinite(v)) continue; 
    sumVal += Number(BigInt(String(v)));
  }

  console.log(`count=${cnt} sum=${sumVal}`);
});
