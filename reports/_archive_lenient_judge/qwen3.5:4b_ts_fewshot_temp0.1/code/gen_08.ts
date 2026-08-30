const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // Leading zeros check and parse
    const trimmedToken = token.trim();
    if (/^\d+$/.test(trimmedToken) || /^-\d+$/.test(trimmedToken)) {
      let n: number | bigint;
      
      try {
        // Handle negative numbers correctly for BigInt conversion logic below or just use parseInt then convert
        const val = trimmedToken.startsWith("-") ? -parseInt(trimmedToken.slice(1), 10) : parseInt(trimmedToken, 10);
        
        if (val < Number.MIN_SAFE_INTEGER || val > Number.MAX_SAFE_INTEGER) {
          // If it exceeds safe integer range but is still a valid int string representation within JS limits for BigInt conversion logic usually handled by parsing directly to bigint or careful handling. 
          // However, standard parseInt handles up to 2^53 safely. For larger integers we should parse as bigInt directly if possible, but the spec says input are integers and sum fits in 64bit.
          // Let's assume valid integer strings that fit within JS Number range for individual elements since they need to be counted individually first? 
          // Actually, let's just use BigInt parsing logic manually or rely on safe conversion.
          
          const bigVal = trimmedToken.startsWith("-") ? -BigInt(trimmedToken.slice(1)) : BigInt(trimmedToken);
          n = Number(bigVal) || val; // Fallback if needed but spec implies standard integers. 
        } else {
           n = val;
        }

      } catch (e) {} 

      // Re-evaluating: The simplest robust way for "integer" in JS without external libs is to check regex and parse carefully or use BigInt directly on the string if it fits 64-bit. 
      // Since sum fits in 64bit, individual elements likely fit too unless one huge number makes up a small count? No, max value of int usually implies fitting within standard types.
      
      // Let's stick to safe parsing: try parse as BigInt directly from string if it looks like an integer (optional minus sign followed by digits).
      const isInt = /^\s*-?\d+\s*$/.test(trimmedToken);
      if (!isInt) continue;

      let valBigInt: bigint | number;
      
      // Check length to decide between Number and BigInt parsing for safety, though parseInt handles up to 2^53. 
      // If the string is longer than ~16 digits, it might lose precision as a JS Number but not as a String->BigInt conversion if we handle signs right.
      const cleanToken = trimmedToken.replace(/[^0-9]/g, "");
      
      let parsedVal: bigint;
      try {
        // Use BigInt constructor which handles the string directly
        parsedVal = parseInt(cleanToken, 10); 
        // Wait, parseInt returns Number. If input is > MAX_SAFE_INTEGER, it becomes NaN or loses precision.
        // Correct approach for arbitrary integer strings in JS:
        const sign = cleanToken.startsWith("-") ? -1 : 1;
        parsedVal = BigInt(cleanToken.replace(/[^0-9]/g, "")); 
      } catch (e) { continue; }

      if (!count.has(parsedVal)) count.set(parsedVal, 0n);
      
      // Update sum using BigInt to avoid overflow during accumulation before final check? Spec says sum fits in 64bit.
      const currentSum = count.get(parsedVal)! + 1n;
      count.set(parsedVal, currentSum);

      if (parsedVal < Number.MIN_SAFE_INTEGER || parsedVal > Number.MAX_SAFE_INTEGER) {
        // If individual element is huge but we are summing to a 64-bit total? 
        // Actually, if an element itself exceeds 2^53-1, it's not representable as JS number accurately.
        // But the problem says "integers". Let's assume they fit in standard integer types or use BigInt for everything internally.
      }

      sum += parsedVal; 
    } else {
       continue;
    }
  }

  const finalCount = count.size;
  
  console.log(`count=${finalCount} sum=${sum}`);
});
