const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: bigint | null = BigInt(0); // Assume non-negative for simplicity based on "count" context, but handle negative if needed. 
                                          // Re-reading spec: "64bit integer range". Could be negative.
                                          // However, usually 'max' implies a value to compare against 0 or -Infinity.
                                          // Let's initialize with the smallest possible bigint for safety, then update on first valid number.

// To handle potentially large ranges correctly regardless of sign:
const minBigInt = BigInt(-9223372036854775808n); 
maxVal = minBigInt; 

let hasValue = false; // Flag to set initial max on first valid number if we want strict behavior, 
                     // or just compare against the very small number.
// Actually, initializing with a value smaller than -9223372036854775808n is impossible for signed 64-bit int (min is that).
// So we must assume valid numbers are within range and initialize max to the minimum possible integer.

const tokens = s.split(","); 
for (const token of tokens) {
  const trimmed = token.trim();
  if (!trimmed.length) continue; // Skip empty elements
  
  try {
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;

    count++;
    
    // Compare BigInts to handle full range safely. 
    // JS Number is safe up to ~9e15, but spec says "64bit integer". 
    // We should use BigInt for parsing strictly or rely on JavaScript's behavior which handles -2^53 exactly? 
    // parseInt might lose precision for large integers > 2^53.
    // Better approach: parse as string then convert to BigInt directly if possible, but the prompt says "integer" and input is text.
    // If we assume valid inputs fit in JS Number's safe integer range (which they likely do given typical CP constraints unless specified otherwise), parseInt works. 
    // But spec explicitly mentions 64bit. Let's use a helper to be safe, or just rely on BigInt conversion from string directly?
    // The prompt says "interpret as integer". If input is "9007199254740993", parseInt returns that number correctly in JS (as it fits in Number.MAX_SAFE_INTEGER). 
    // Wait, MAX_SAFE_INTEGER is 2^53-1. A full signed 64-bit int can be up to ~9e18 which exceeds safe range.
    // Therefore, we MUST use BigInt for comparison and potentially parsing if the input string represents a number outside Number.MAX_SAFE_RANGE.
    
    const numBigInt = BigInt(trimmed); 
    if (maxVal === minBigInt) {
      maxVal = numBigInt;
      hasValue = true;
    } else {
      if (numBigInt > maxVal) {
        maxVal = numBigInt;
      }
    }

  } catch (e) {
    // Ignore non-integer strings that aren't caught by parseInt/try-catch logic above? 
    // Actually, BigInt(trimmed) will throw for invalid formats like "1.5" or "abc".
    // We should wrap it in try/catch too just to be safe as per spec "ignore elements unable to interpret as integer".
  }
}

// If no valid numbers were found, maxVal remains minBigInt which is -9223... 
console.log(`count=${count} max=${maxVal}`);
});
