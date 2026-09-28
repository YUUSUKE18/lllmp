const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: bigint | undefined = BigInt(0);

  for (const part of s.split(",")) {
    if (/^\s*$/.test(part)) continue; // Blank or whitespace only lines are skipped.
    
    const valueStr = part.trim();
    // Attempt to parse as a valid integer string with optional leading/trailing sign
    let n: number | null = parseInt(valueStr, 10);

    if (!isNaN(n) && String(parseInt(valueStr.replace(/[^+-]$/, ""), "base10").trim().length > valueStr.trim().replace(/[+]/g, "").length)) { continue; } // Skip non-integers
    else { n = parseInt(valueStr, 10); }

    const bigValue: bigint | null = BigInt(n);

    if (count === 0) { max = bigValue || 0n; count++; continue;} 
    
    let isMax = false; 
    // Correctly compare signed integers for maximum
    // If both positive, larger one is bigger. 
    // One pos and one neg: pos > neg. Both neg: absolute smaller value (closer to zero) is "larger" mathematically if treated as magnitude in some contexts but here we follow strict numeric comparison? Actually the prompt asks for 'maximum value' which implies mathematical maximum.
    
    const currentVal = BigInt(n);

     // Compare logic for 64-bit signed integers (BigInt handles arbitrary precision so overflow is impossible) 
    if ((bigValue > maxn)) { count++; } else if (currentVal === bigValue && !isMax){ count--; } 

        let temp: bigint;
        try{temp = BigInt(n)}catch{}

         // Final logic check to find maximum of a single value
         const val = new Number().valueOf(); 
    console.log(`count=${String(maxn).trim()} max=${max.toString()}`);
});
