import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const parts = line.split(',').map((s) => parseInt(s.trim(), 10)).filter((n): n is number => !isNaN(n));
  
  if (parts.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  const uniqueNumbers = new Set<number>();
  for (const num of parts) {
    uniqueNumbers.add(num);
  }

  let count = uniqueNumbers.size;
  let sum = 0n; // Use BigInt to ensure safety, though spec says it fits in 64-bit.
  
  const bigIntSet = new Set<number>();
  for (const num of parts) {
    if (!bigIntSet.has(num)) {
      bigIntSet.add(num);
      sum += Number(BigInt(num)); // Convert BigInt to number is safe here as input fits in range, but we accumulate using BigInt logic implicitly by casting back. Wait, let's just use regular numbers since spec guarantees 64-bit fit for the final result. However, intermediate sums might overflow if not careful? No, "合計は 64bit 整数の範囲に収まります" implies the sum itself fits in a signed 64-bit integer (max ~9e18). JavaScript Number is safe up to 2^53 safely, but for exact representation of integers up to 2^53 it's fine. If the input numbers are large but few unique ones, or many small ones that sum to < 9*10^18, standard JS number might lose precision during summation if not careful? Actually, JavaScript uses IEEE 754 double which has 53 bits of mantissa. Integers up to 2^53 are represented exactly. If the unique numbers can be large (e.g., near 9*10^18), we cannot sum them in JS Number without precision loss if they exceed 2^53 (~9e15). The spec says "合計は 64bit 整数の範囲に収まります". It does not guarantee individual numbers fit within safe integer range. To be strictly correct, I should use BigInt for the calculation to avoid any floating point issues, then cast back at the end or output as string directly from BigInt arithmetic? But the format requires `sum=<合計>`. If I calculate sum using BigInt and convert it to a string, that's fine.

  // Re-calculate with BigInt logic properly
  const uniqueBigInts = new Set<number>();
  let countBig = 0;
  
  for (const num of parts) {
    if (!uniqueBigInts.has(num)) {
      uniqueBigInts.add(num);
      countBig++;
    }
  }

  // Calculate sum using BigInt to prevent precision loss during accumulation
  const bigIntSum: bigint = 0n;
  for (const num of parts) {
    if (!uniqueBigInts.has(num)) {
       // We need the value. Since input is integer, we can treat it as number or string. 
       // If the unique numbers themselves are large (>2^53), Number() will lose precision.
       // So let's parse them as strings and convert to BigInt for summation? No, parsing logic already did parseInt which returns Number.
       // To be safe against input like 10**18 + 7 (which fits in JS number but loses lower bits if not careful?), actually JavaScript parses large integers correctly into a float representation that might lose low bits if > 2^53? 
       // Actually, parseInt("99999999999999999") returns the closest representable double. If we need exact integer arithmetic for sum of unique numbers where each number could be large (but their count is small enough that total fits in 64-bit signed), we must use BigInt throughout.
       
       // Let's re-parse as string to avoid any Number precision loss on individual inputs if they are huge but valid integers? 
       // The spec says input is "integer". In JS, parseInt handles strings up to safe integer range reasonably well for display, but mathematically it converts to float.
       // To be absolutely robust: read parts as string tokens first? No, the logic above used Number().
       
       // Let's restart the loop with BigInt awareness.
    }
  }

  // Correct approach using strings and BigInts from start for precision safety on large inputs that sum to < 9e18 but individual might be > 2^53? 
  // Wait, if a number is > 2^53, it cannot be represented exactly in JS Number. If the input contains such numbers, parseInt will return an approximation.
  // However, usually "integer" implies mathematical integer. To avoid this trap:
  
  const uniqueSet = new Set<string>(); 
  let countStr = 0;
  
  for (const s of parts) {
    if (!uniqueSet.has(s)) {
      uniqueSet.add(s);
      countStr++;
    }
  }

  // Now sum using BigInt from the string representation to ensure exactness.
  const bigSum: bigint = 0n;
  for (const s of parts) {
     if (!uniqueSet.has(s)) {
        // Check if it's a valid integer? parseInt already validated non-empty and numeric-ish via filter earlier but let's trust the input format "integer".
        // Actually, I filtered with isNaN. 
        const val = BigInt(parseInt(s.trim(), 10)); // This is still risky if s was huge string that didn't fit Number mantissa perfectly before conversion? No, parseInt returns a number (float). Converting float to BigInt truncates/fails? BigInt(Number) throws RangeError if out of range.
        // Better: use the original string part for calculation directly via parsing logic inside loop without relying on intermediate Number precision loss.
     }
  }

  // Final robust implementation plan:
  // 1. Parse input parts as strings (trim, check validity).
  // 2. Use a Set of Strings to track unique values exactly.
  // 3. Count unique strings.
  // 4. Sum them up using BigInt by parsing each string directly into BigInt during the summation loop.

  const validParts = line.split(',').map(s => s.trim()).filter(s => {
    return /^-?\d+$/.test(s); 
  });

  if (validParts.length === 0) {
    console.log(`count=0 sum=0`);
    rl.close();
    return;
  }

  const uniqueSet = new Set<string>(); // Store as string to preserve exactness before conversion? Or just store number but use BigInt for math. 
  // Actually, storing as string is safer if we parse on the fly. But checking uniqueness by string value works perfectly since input integers are canonical representations (no leading zeros usually implied unless specified).
  
  let count = validParts.length;
  const seenNumbers = new Set<number>(); // Wait, duplicates in input? "重複を除いた整数" -> Unique numbers based on their integer value. 
  // If input has "01", is it same as "1"? Yes. So storing as string might be wrong if inputs have leading zeros like "01".
  
  // Let's stick to: Parse all valid integers into a Set of Numbers (using Number constructor or parseInt). Then iterate again with BigInt for sum? 
  // No, converting huge number strings to JS Number loses precision. We must use BigInt directly from the string if possible.
  
  // Revised Logic:
  // 1. Split by comma, trim.
  // 2. Filter out non-integers (regex).
  // 3. Convert each valid integer part into a String representation? No, convert to Number then Set(Number) loses precision for large inputs > 2^53. 
  //    BUT: If the input is "100000000000000000" (which fits in JS number as float approx), and another "9", sum might be affected?
  //    Actually, if an integer > 2^53 exists, it cannot be represented exactly. The problem says input is integers. If the user provides a large integer string that exceeds safe range, parseInt will give wrong value. 
  //    However, standard JS `parseInt` behavior: "100... (large)" -> returns closest double.
  //    To avoid this, we should treat inputs as strings and convert to BigInt directly without intermediate Number conversion for the set? But uniqueness check requires comparing values. If two numbers are numerically equal but string different ("1" vs "01"), they must be treated as same. 
  //    So: Parse each valid token into a canonical form (Number) -> Set(Number). Then sum using BigInt of that Number? No, if the number was > 2^53, it's already lost precision in the set creation step!
  
  // Conclusion: If inputs can exceed 2^53, we cannot use JS Number for uniqueness check accurately. 
  // However, typical competitive programming or simple tasks assume inputs fit within safe range unless specified otherwise? Or maybe I should just assume standard behavior where `parseInt` is used and the constraints imply valid math integers that sum to < 9e18.
  // Given "合計は 64bit 整数の範囲に収まります", it implies the final result fits in signed 64-bit int (max ~9,223,372,036,854,775,807). 
  // If individual numbers are larger than this, they can't be summed to fit unless count is negative? No.
  // So likely inputs themselves don't exceed safe range significantly or the test cases are well-behaved.
  // But to be strictly correct for "integer" input: Use BigInt parsing directly from string without intermediate Number conversion if possible. 
  // How to compare two large integer strings represented as numbers? We can normalize them (remove leading zeros) and then use a Set of normalized strings or parse with `BigInt` constructor which accepts string!
  
  const uniqueValues = new Set<string>(); // Store canonical representation? Or just store the BigInt value.
  // Let's create a helper to get canonical number from string: remove non-digits, leading zeros? 
  // Actually, simplest is: Parse as Number (which might lose precision) OR parse directly into BigInt and use that for uniqueness check.
  
  const bigIntSet = new Set<bigint>();

  let countBigInts = validParts.length;

  for (const s of validParts) {
    try {
      // Convert string to BigInt safely without intermediate Number loss? 
      // If the number is too large for JS Number, parseInt(s) will fail or be weird. But we can use `BigInt` constructor directly on string if it's a valid integer representation.
      const val = BigInt(parseInt(s)); // Still uses Number first! This defeats the purpose of avoiding precision loss from float conversion.
      
      // Correct way: Use regex to ensure format, then parse as BigInt? 
      // Actually, `BigInt` constructor takes a string or number. If we pass a huge string directly: `BigInt("9007199254740993")`. This works perfectly in modern JS engines (V8/Chrome) for strings!
      // So the solution is to NOT use Number() at all, just parse BigInt from string.
      
      const num = BigInt(s); 
      if (!bigIntSet.has(num)) {
        bigIntSet.add(num);
      }
    } catch (e) {
       // Ignore invalid formats as per spec "整数として解釈できない要素も無視します" - but we already filtered with regex.
    }
  }

  let count = bigIntSet.size;
  
  const sum: bigint = 0n;
  for (const s of validParts) {
     // Only add if unique? No, spec says "重複を除いた整数について". 
     // So we only care about the set of unique numbers. Sum them up once each.
     // But wait, how do I know which ones are in the set without iterating twice or storing flags?
     // Iterate over bigIntSet:
  }

  for (const num of bigIntSet) {
    sum += num;
  }

  console.log(`count=${count} sum=${sum}`);
  
  rl.close();
});
