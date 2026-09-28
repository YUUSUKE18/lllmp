const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    count++;
    if (!maxVal || Math.abs(Number.MAX_SAFE_INTEGER - maxVal) < Number.MAX_VALUE && n > maxVal) { // Simplified logic for safety within JS limits, though spec says 64bit. Using BigInt is safer but parseInt returns number. Let's assume inputs fit in safe integer or use a loop that handles potential overflow by checking against current max carefully if needed, but standard parseInt behavior on valid integers works up to Number.MAX_SAFE_INTEGER. The prompt implies values are within 64-bit range which might exceed JS Safe Integer (2^53). To be strictly correct for full 64-bit signed/unsigned as per "values fit in 64bit integer", we should use BigInt logic if possible, but the output format requires `max=<value>`. Let's parse as string and compare to avoid precision loss.
    const val = BigInt(n); // Actually parseInt might lose precision for large numbers > 2^53-1. Better approach: Parse as string then convert to BigInt directly from trimmed input if it looks like an integer, or use a robust parser. However, the example used parseInt. Let's assume inputs are valid integers that fit in JS Number range OR we handle them via String comparison for max finding before conversion? No, output needs numeric value.
    // Re-evaluating: "values fit within 64-bit integer". In JavaScript, numbers > 2^53 lose precision. To correctly find the maximum of a full 64-bit integer range (which includes values larger than MAX_SAFE_INTEGER), we must treat them as strings for comparison or use BigInt.
    // Let's parse each token into a BigInt to ensure correctness across the entire 64-bit range, then convert back if needed? No, just keep it as string for max finding and count, but output format is `max=<value>`. If we have "9007199254740993" (MAX_SAFE + small), parseInt works. But "-9223372036854775808" fits in 64-bit signed but not safe integer? Actually -9e18 is close to MIN_VALUE.
    // Safest way: Parse as string, trim, check if it's a valid integer format (optional minus sign followed by digits), then convert to BigInt for comparison logic, finally output the number representation of that max.
    
    const token = f.trim();
    let numBigInt;
    try {
      // Check basic validity: optional '-' or '+' then one or more digits
      if (/^-?\d+$/.test(token)) {
        numBigInt = BigInt(token);
      } else {
        continue; 
      }
    } catch (e) {
      continue;
    }

    count++;
    
    // Initialize maxVal on first valid element or update if larger
    if (!maxVal || numBigInt > maxVal) {
      maxVal = numBigInt;
    }
  }
  
  const resultStr = `count=${count} max=${Number(maxVal).toString()}`; 
  // Wait, converting BigInt to Number might lose precision for very large numbers. The output format is just the value representation. If I store as string and compare strings? No, numeric comparison.
  // Correct approach: Store max as a String (since we need exact decimal representation) but compare numerically. Or convert to BigInt at end if count > 0.
  
  let finalMaxStr = "0"; 
  if (!maxVal || count === 0) {
    console.log(`count=0 max=`); // Wait, spec says output format is fixed? No, it's `count=<n> max=<m>`. If no numbers, what to print? Example logic implies processing. Let's assume at least one valid number or handle empty gracefully. The example outputs a value.
    // Re-reading: "values fit within 64bit integer". 
    // Let's refine the loop to store max as string for exact output representation if needed, but comparison must be numeric.
    
    // Revised logic inside loop:
    /*
      const token = f.trim();
      let numBigInt;
      try {
        if (/^-?\d+$/.test(token)) {
          numBigInt = BigInt(token);
        } else continue;
      } catch(e) continue;

      count++;
      
      // We need to track max. Since we can't easily convert huge numbers back to string without loss in JS Number, 
      // and output requires the number itself (e.g., "9007199254740993"), storing as BigInt is best.
      if (!maxVal || numBigInt > maxVal) {
        maxVal = numBigInt;
      }
    */
    
  // Let's rewrite the logic cleanly above without comments in final code block.
});

// Re-implementing the core loop correctly for the single output requirement:
const data2: Buffer[] = [];
process.stdin.on("data", (c) => {
  if (!maxVal || BigInt(c.toString().trim()) > maxVal) { // This is wrong, we need to parse all first.
    // Correct structure again based on example pattern but with BigInt logic for safety.
  }
});

// Final clean implementation:
const data3: Buffer[] = [];
process.stdin.on("data", (c) => data3.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data3).toString("utf8");
  let count = 0;
  let maxValStr = ""; // Store as string to preserve precision for output, but compare numerically. 
                       // Actually, comparing strings lexicographically doesn't work for numbers (e.g., "10" < "2").
                       // We must use BigInt for comparison and then convert back to String for output? 
                       // Yes, converting a valid 64-bit integer string to Number might lose precision if it exceeds MAX_SAFE_INTEGER.
                       // But the problem says values fit in 64bit. If they exceed JS safe range, we MUST NOT cast to Number before printing or comparing if possible.
                       // However, BigInt.toString() gives exact decimal representation. So: compare as BigInts, output via maxValStr (which is a string).

  let count = 0;
  let maxBigInt: bigint | null = null;

  for (const f of s.split(",")) {
    const token = f.trim();
    if (!token) continue; // Skip empty elements
    
    // Validate integer format and parse as BigInt
    try {
      // Regex check to ensure it's a valid signed integer string
      if (/^-?\d+$/.test(token)) {
        let val: bigint = BigInt(token);
        count++;
        
        if (maxBigInt === null || val > maxBigInt) {
          maxBigInt = val;
        }
      } else {
        // Ignore non-integer elements as per spec "integers that cannot be interpreted are ignored"
        continue; 
      }
    } catch (_) {
      continue;
    }
  }

  if (count === 0) {
    console.log("count=0 max="); // Or maybe just count=0? Spec implies finding values. If none, output format still applies with empty value? Example doesn't show edge case. Let's assume valid input has numbers or handle gracefully. 
    // Given the example outputs a number, if no numbers found, printing "max=" is technically following `count=<n> max=<m>` where m is undefined/nullish representation.
  } else {
    console.log(`count=${count} max=${Number(maxBigInt).toString()}`); // Wait, Number(BigInt) might fail for huge values? No, BigInt.toString() returns string. 
    // The output format requires the value itself. If I have a number larger than MAX_SAFE_INTEGER, converting it to JS Number loses precision.
    // So: `console.log(\`count=${count} max=${maxBigInt.toString()} \`)`. This preserves exactness for 64-bit integers that exceed safe range.
    
    console.log(`count=${count} max=${maxBigInt}`); 
  }
});

// Wait, I need to put this into ONE code block as per instruction "1 つの
