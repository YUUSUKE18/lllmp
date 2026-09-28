```typescript
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0); // Using BigInt to handle large numbers if necessary, though spec says fits in 64-bit. 
                      // However, JS Number is safe up to ~9e15 (approx 2^53), so for strict "fits in 64 bit" we should consider the range [-9e18, 9e18].
                      // Since inputs are integers and sum fits in 64-bit signed integer, let's use BigInt for safety during accumulation then cast to Number if within range or keep as string? 
                      // Actually, spec says "合計は 64bit 整数の範囲に収まります", so the final result is a safe number. But intermediate sums could theoretically exceed if not careful? No, problem states sum fits in 64-bit integer range.
  
  const set = new Set<number>(); 
  // We need to process and count unique integers? Wait: "重複を除いた整数について、個数と合計を求めます" -> Does it mean for each unique number found in the input list, we calculate its occurrence count (frequency) and then sum those up? Or does it mean just count how many UNIQUE numbers there are AND their total sum of values?
  // Re-reading: "重複を除いた整数について、個数と合計を求めます" -> Likely means: Take all unique integers from the input, calculate the SUM OF COUNT(Frequency) for each unique number (which is exactly the TOTAL COUNT of elements processed), and the SUM of VALUES of these unique numbers?
  // Wait. If I have [1, 2, 3], counts are {1:1}, sum=4 -> count_sum = 3, value_sum = 6. 
  // But if I interpret as "For each distinct integer X present in input:", we get a list of pairs (count_X, val_X). Then what is the output?
  // Let's look closer at Japanese phrasing: "重複を除いた整数について、個数と合計を求めます" -> Usually implies for EACH unique element found. 
  // But the output format requested is `count=<number> sum=<total>` (singular outputs, not arrays).
  // Ah! The most logical interpretation given the single line output format `count=X sum=Y` where X and Y are scalars:
  //   count = Total number of UNIQUE integers found in input. 
  //   sum = Sum OF ALL INTEGERS present in input (including duplicates? Or unique values?).
  // "重複を除いた整数" usually implies filtering the list to distinct elements. Then for that filtered set, what are we calculating? Count and Sum of VALUES?
  // Let's try: Input [10, 20, 30]. Unique: {10, 20, 30}. 
  //   Interpretation A (Count unique numbers): count=3. sum = 10+20+30=60.
  //   Interpretation B (Sum of frequencies): If we have [1,1,2], Unique are {1,2}, counts per value: 1->2, 2->1. 
  //     "個数" could mean total count = 3? Or sum of individual counts? That's always the input length! So that makes no sense unless it means something else.
  //   Likely Interpretation A is correct: Count how many distinct integers exist. Sum their actual values (or maybe sum of unique occurrences?). 
  // Let's assume standard competitive programming logic: "Unique numbers count" and "Sum of those unique numbers".
  
  // Wait, another possibility: Maybe it means calculate for each unique number its frequency, then output the total number of unique integers found AND the SUM OF ALL ORIGINAL NUMBERS? No.
  // Let's go with: Count = Number of Unique Integers. Sum = Sum of all UNIQUE Integers (values). 
  // Example Input: "1,2,3" -> count=3, sum=6. 
  // Example Input: "5,5,6" -> unique={5,6}. count=2. sum = 5+6 = 11? Or is it the frequency of each summed up (which equals total items)? That would be trivial if input length fits in int and output matches.
  
  // Let's re-read carefully: "重複を除いた整数について" -> Regarding integers with duplicates removed. 
  // So we take the set of unique values found in input. 
  // Then "個数" (count) likely refers to how many such unique items exist.
  // And "合計" (sum) likely refers to sum of these unique items.
  
  // Example: Input: "10, 20 , 30". Unique: {10, 20, 30}. Count=3, Sum=60.
  // Input: "5,5", Unique: {5}. Count=1, Sum=5. 
  // This seems the most non-trivial and logical interpretation that requires filtering duplicates first.

  const uniqueNumbers = new Set<number>(); 
  
  for (const chunk of s.split(",")) {
    if (!chunk.trim()) continue;
    
    let n: number | null = parseInt(chunk, 10); 
    if (Number.isNaN(n) || !isFinite(n)) continue; // Skip invalid integers
    
    uniqueNumbers.add(n as number);
  }

  const count = uniqueNumbers.size; 
  let sumVal = BigInt(0); 

  for (const n of uniqueNumbers) {
      sumVal += BigInt(n); 
  }
  
  console.log(`count=${count} sum=${sumVal}`); // Output with string representation. If number is huge, BigInt handles it correctly even if spec says "fits in 64 bit". String conversion works fine for numbers < ~9e18N.js Number max is 2^53 but input might be larger within 64-bit range (up to 9e18). Actually JS Number.MAX_SAFE_INTEGER is much less than full signed int64. So we MUST use BigInt or format it as string? 
      // The prompt says "sum fits in 64bit integer". In Javascript, if the sum > MAX_SAFE_INT but < INT_MAX_BIT_32 (approx?), wait. Signed Int64 max is ~9*10^18. JS Number goes up to 53 bits of precision (~9e15). 
      // If input contains large integers like 9e18, parseInt converts them? No, standard behavior for parsing big ints in JS (if not string split) might lose precision if > MAX_SAFE_INT during math operations unless using BigInt.
      // Since we used set of number types and then added to sumVal via BigInt(n), it forces conversion. If n is a huge integer that doesn't fit in Number but does fit in 64-bit, parseInt returns something? Actually standard float representation loses precision for >2^53 integers if they are treated as doubles internally before being stored into Set of numbers?
      // No: In JavaScript, all number literals are double-precision. The `Set` stores primitives. If input is "9000000000000001", parseInt might return it correctly or maybe not if > MAX_SAFE_INT during creation? 
      // Actually modern JS engines handle integers up to 2^53 safely as numbers, but larger ones are treated with imprecision due to IEEE754 limitations unless parsed via decimal string manipulation.
      // However, `parseInt(str)` behaves well for exact values within safe range or approximates above it? 
      // To be absolutely correct regarding "sum fits in 64 bit", we should parse every token as a BigInt directly first! Then convert to number only if needed? Or store as string then sum later?
      
    // Let's refine the approach: Parse each chunk into BigInt, add to set (store string or BigInt), compute count and sum.
    
    // Wait, earlier loop used Number(n). That loses precision for large ints > 2^53 but < 9*10^18? 
    // Yes! So we must use BigInt throughout.
    
}

// Corrected logic below:
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  
  // Use BigInt for everything to ensure precision within full range of signed/int64 (up to ~9e18 vs JS Number limit ~9e15)
  const seen = new Set<string>(); 
  let totalSumBigInt: bigint | null = null; 

  // Helper function logic inline
    
  // We need sum of unique integers. And count of unique integers.

  for (const chunk of s.split(",")) {
    if (!chunk.trim()) continue;
    
    const tokenTrimmed = chunk.trim();
    try { 
      let b: bigint | null; 
      // Parse BigInt from string directly to avoid precision loss in Number conversion intermediate steps
      // Note: input numbers are integers. Using 'bigIntFromString' equivalent logic or simply using native parsing if available? 
      // Native parseInt is dangerous for > 2^53. We need safe big int parse.
      
      let parsedVal: bigint = BigInt(0);
      // Manual regex to extract negative sign and rest, then split by whitespace in number string?
      // Or simpler: Replace '-' with something if needed? No, just use a helper or try/catch logic? 
      // Actually JS doesn't have built-in `BigInt.from` for strings directly like `Number.parseInt`. 
      // But we can do: const val = parseInt(chunk.trim(), 10); this loses precision.
      
      // Let's write a safe parser inside the loop or use a temp variable as string and parse manually?
      // Better: Use `BigInt("...")` syntax with explicit check for overflow during construction if any framework limitation exists, but standard JS supports converting strings to BigInt arbitrarily large (limited by memory). 
      
      let valStr = tokenTrimmed.replace(/[^0-9]/g, ""); // remove non-digits? No wait.
      // Input might be "-123". The regex above removes '-'. Bad idea if negative numbers are expected. "整数" includes negatives.
      const hasMinus = /-/s.test(tokenTrimmed); 
      let valStrOnly: string | null;
      
      // Extract digits and optional minus sign from start? No, just handle the whole string carefully.
      // Actually `BigInt` can parse negative strings directly in most versions of JS/Node.js now!
      const n = BigInt(tokenTrimmed); 
      if (isNaN(n as any)) continue; // Should not happen with valid input
      
      seen.add(tokenTrimmed.replace(/[^0-9]/g, "")); Wait no. We want unique INTEGERS. "-5" and "  -5 " are same int but different strings? No `toString` might differ if spaces included? 
      // But we split by comma first so only digits/minus sign remain per token usually (except potential trailing space before trim).
      // So using the trimmed string as key in Set is risky if input has weird formatting like "1.2"? No, problem says integers.
      // Is "- 5" valid? Problem says blank whitespace ignored. 
      
      // Let's assume standard integer format: optional leading sign followed by digits. 
      // We can store the original trimmed string in Set as long as we normalize it (remove spaces inside token? Token shouldn't have internal spaces).
      // If input is "-1", " - 1" ? Whitespace between minus and digit ignored per problem ("空白...無視"). So parse should be robust.
      
      const normalizedStr = n.toString(); 
      seen.add(normalizedStr); 

    } catch (e) { continue; }
    
    // Wait, the previous logic was flawed because we tried to use `Number(n)` inside a loop but decided on BigInt later. Let's restructure cleanly.

  /*
  Restarting clean implementation plan:
  
  Read all input into one string `s`.
  Split by comma "," -> array of strings chunks.
  For each chunk:
    trim whitespace. if empty continue.
    parse integer safely as BigInt directly from the string? 
      Try parsing using regex to extract sign and digits or use built-in `parseInt`? No, let's do manual safe parsing since standard parseInt is unsafe for full int64 range.
      Regex pattern: /^(-?\d+)$/ matches integers. Then construct number manually if needed OR just rely on BigInt constructor accepting string which handles large numbers correctly! 
      Wait, does `BigInt("123...long")` work? Yes in Node.js/JS it works regardless of length (as long as memory allows).
      
  So:
    const token = chunk.trim();
    if (!/^[-+]?\d+$/.test(token)) continue; // Validate integer format
    
    let valBigInt: bigint | null = null; 
    try {
      valBigInt = BigInt(token); 
      // Add to Set as string representation of the value or just use the token? 
      // We must ensure uniqueness based on VALUE. e.g. "+1" and " 1" should be same. Since we trim, they become equivalent strings if no internal non-digit chars except sign/digits.
      // But what if input is "- 5"? The regex /[-+]?\d+/ might not match - 5 (no space). 
      // Problem says: blank whitespace ignored. So "123   4" -> token could be "    ". We trim it first, so tokens are clean of leading/trailing blanks?
      // What about internal spaces like "- 1"? Is that valid integer string per problem spec? Usually inputs in such problems don't have weird spacing inside numbers unless specified. 
      // Let's assume input format is canonical after trimming: optional sign + digits without space breaks within the number itself.
      
    } catch(e) { continue; }

    if (valBigInt !== null && seen.has(valBigInt.toString())) continue; 

    set.add(...); 
*/

// Final refined logic with BigInt support and proper parsing
   
  const uniqueValues = new Set<string>(); // Store as string to avoid object comparison issues or rely on toString()
  
  for (const chunk of s.split(",")) {
    let token = chunk.trim();
    if (!token) continue; 
    
    // Validate: integer format. Allow leading/trailing spaces removed by trim, so only digits and optional sign at start.
    const numRegex = /^[-+]?(\d+)$/.test(token); 
    // Wait, regex test on "123" is true. On "+-1"? No good input won't have + -. Good inputs are like -5 or 5.
    
    if (!numRegex.test("".concat(token))) continue; 

    try {
      const val = BigInt(token); 
      uniqueValues.add(val.toString()); // Unique by value string representation (e.g., "10", "-2")

      // Note: The problem says input integers, and we need to sum them. Summation logic later handles the set values properly? No wait, I thought earlier about interpretation of count/sum.
      
    } catch(e) { continue; }
  }
  
  const size = uniqueValues.size; 
  let totalSumBigInt: bigint | null = null; 
  
  for (const
