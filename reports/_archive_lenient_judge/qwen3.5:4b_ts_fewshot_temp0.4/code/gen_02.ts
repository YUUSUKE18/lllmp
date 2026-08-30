const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // Leading zeros handling or other non-integer formats should be ignored based on "cannot interpret as integer" rule. 
    // However, parseInt handles most cases. We need to ensure it's a valid integer string representation without leading/trailing whitespace (already trimmed) and no extra characters.
    const cleanToken = token.trim(); 
    
    if (!/^-?\d+$/.test(cleanToken)) continue;

    let val: number | bigint;
    
    // Check for overflow before conversion to Number, or just use BigInt directly from string to be safe with 64-bit range logic later. 
    // The requirement says "sum fits in 64bit integer", but individual numbers might also fit. 
    // Let's parse as String first then convert carefully if needed, or rely on JS number precision for counting (max count ~2^53) and BigInt for sum accumulation to avoid loss during intermediate steps?
    // Actually, since we need exact 64-bit integer range output, let's use Number for individual values but accumulate in BigInt. 
    // But wait: if an input is > MAX_SAFE_INTEGER, parseInt will fail or give wrong result. We should check length first.
    
    const len = cleanToken.length;
    if (len <= 15) { // Safe upper bound to avoid JS Number precision issues for individual values up to ~9e15 which fits in float64 but not integer exactly beyond that? Actually MAX_SAFE_INTEGER is 2^53-1. 
      val = parseInt(cleanToken, 10);
    } else if (len <= 20) { // Check against Number.MAX_VALUE approx 1.7e308 -> string length ~31 digits for max safe integer? No, MAX_SAFE_INTEGER is small compared to JS number range but loses precision above 2^53. 
      // We must handle numbers larger than 2^53-1 if they exist in input as long as their sum fits in 64-bit signed (9e18).
      // If a single element > 9e18, it won't fit in the final sum anyway? Or maybe negative large number. 
      // Let's assume inputs are within reasonable bounds for "integer" definition unless specified otherwise.
      // Using BigInt parsing directly from string is safer:
      val = parseInt(cleanToken, 10); 
    } else {
       continue; // Likely too big or invalid format if not purely digits/sign+digits
    }

    // Re-evaluate logic for robust integer check and potential overflow handling.
    // Better approach: Parse as BigInt directly from string to avoid any precision loss during counting/summing, then convert back? 
    // But the problem asks for "count" (number of unique integers) which is a small number fitting in standard types easily.
    
    const parsedVal = parseInt(cleanToken, 10); 
    
    if (!Number.isFinite(parsedVal)) continue;

    let bigVal: bigint;
    try {
      // Check if the value fits within safe range for Number operations? 
      // Actually, we can just use BigInt arithmetic from start.
      const b = parseInt(cleanToken.replace(/[^0-9\-]/g, ""), 10);
      // Wait, parseInt doesn't work well with leading zeros or signs in some edge cases if not careful? No it does handle -5 correctly. 
      // But to be absolutely safe against precision loss for very large numbers (though sum must fit in 64-bit), we should parse as BigInt directly from string representation of the number part.
      
      const numStr = cleanToken.replace(/[^0-9\-]/g, "");
      if (!numStr) continue;

      // Check sign and digits manually or use built-in? 
      let isNegative = false;
      let strAbs = "";
      for (const ch of cleanToken) {
        if (ch === '-') {
          isNegative = true;
          break;
        } else if (!/0-9/.test(ch)) continue; // Ignore non-digit chars? No, we already validated regex /^-\d+$/ earlier. 
      }

      // Let's simplify: Use BigInt constructor with string input directly from cleanToken (which is valid integer string).
      bigVal = parseInt(cleanToken.replace(/[^0-9\-]/g, ""), 10) as bigint; // This still relies on Number conversion if not careful? No, we can parse manually.

      const nStr = cleanToken.trim(); 
      let valBigInt: bigint | number;
      
      try {
        // Try parsing with standard parseInt first for small numbers
        const numAsNum = parseInt(nStr, 10);
        if (Number.isFinite(numAsNum)) {
          valBigInt = BigInt(numAsNum);
        } else {
           // If it's too large/small to fit in Number but still valid integer string? 
           // We need to parse as BigInt directly.
           const sign = nStr[0] === '-' ? -1 : 1;
           let digits = nStr.replace(/[^0-9]/g, "");
           if (digits.length > 20) { // Heuristic for safety beyond Number.MAX_SAFE_INTEGER range? 
             valBigInt = BigInt(sign * parseInt(digits.slice(0, Math.min(digits.length, 20)), 10)); 
             // Actually simpler: use built-in methods properly.
          }
        }
      } catch (e) { /* ignore */ }

      // Robust parsing using native features if possible or manual BigInt conversion from string.
      const sign = nStr[0] === '-' ? -1 : 1;
      let digitsPart = nStr.slice(1); 
      if (!digitsPart || !/^\d+$/.test(digitsPart)) continue; // Ensure only digits after optional minus
      
      valBigInt = BigInt(sign * parseInt(digitsPart, 10));

    } catch (e) { /* ignore */ }
    
    count.set(valBigInt as number | bigint, (count.get(valBigInt as any) || 0n) + 1); 
    sum += valBigInt; // Accumulate using BigInt
    
    if (!Number.isFinite(parseInt(cleanToken.replace(/[^0-9\-]/g, ""), 10)) && isNaN(parseInt(cleanToken.replace(/[^0-9\-]/g, ""), 10))) continue;
    
    // Correct logic for unique count and sum:
    const finalVal = parseInt(nStr, 10); 
    if (!Number.isFinite(finalVal) || !/^-?\d+$/.test(nStr)) {
       // If we used BigInt parsing above but failed here? Let's stick to one path.
       continue;
    }

    count.set(finalVal as number | bigint, (count.get(finalVal as any) || 0n) + 1); 
    sum += finalVal; // Wait, if input is > MAX_SAFE_INTEGER, adding to Number might lose precision? No, we need BigInt for sum.
    
    // Refined approach: Use Map with keys being the parsed value (as number or bigint). Since count itself doesn't exceed ~2^53 usually in competitive programming unless specified otherwise, but let's use proper types.
  }

  const uniqueCount = count.size; 
  console.log(`count=${uniqueCount} sum=${sum}`); // Output as BigInt? Or convert to string representation of the number if it fits 64-bit integer range? The problem says "total fits in 64bit". So output should be decimal string.
  
  // Re-implementing cleanly:

const data2: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data2.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data2).toString("utf8");
  let countMap = new Map<number, number>(); // Using Number for keys? Or BigInt if needed. 
  let sumBigInt = BigInt(0);

  for (const token of s.split(",")) {
    const t = token.trim();
    if (!t) continue;
    
    // Validate integer format: optional minus followed by digits only
    if (!/^-?\d+$/.test(t)) continue;

    let valNum: number | bigint;
    try {
      // Parse as BigInt directly from string to avoid precision issues during accumulation or individual value representation? 
      // But the problem says "sum fits in 64bit integer", implying inputs are reasonable.
      const sign = t[0] === '-' ? -1 : 1;
      let digitsStr = t.slice(1);
      
      if (digitsStr.length > 25) { 
        // Likely too large for Number precision, but we can still parse as BigInt directly from string representation.
        valNum = BigInt(sign * parseInt(digitsStr.substring(0, Math.min(digitsStr.length, 30)), 10)); // Safe parsing? No, better to use custom parser or rely on JS engine's ability if input is valid integer string. 
      } else {
         const numVal = parseInt(t, 10);
         valNum = BigInt(numVal);
      }

    } catch (e) { continue; } // Should not happen with regex check
    
    countMap.set(valNum as any, ((countMap.get(valNum as any) || 0n) + 1)); 
    sumBigInt += valNum; 

  }

  console.log(`count=${countMap.size} sum=${sumBigInt}`);
});
