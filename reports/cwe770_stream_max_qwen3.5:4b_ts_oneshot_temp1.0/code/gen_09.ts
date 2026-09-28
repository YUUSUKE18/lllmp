const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let max: bigint | undefined;
  const parts = s.split(/\s+/);

  for (const f of parts) {
    if (/^\d+$/.test(f.trim())) {
      const n = BigInt(parseInt(f, 10)); // Assuming inputs fit in standard JS numbers but we parse as string to safe BigInt conversion via parseInt which is fine for range -9e15..9e15. For larger 64-bit int (up to ~9*10^18), need better parsing or check input length logic if user says "integer" meaning JavaScript Number max/min usually works but strict BigInt needed per spec? Spec says: values fit within 64-bit integer range. So parseInt is fine as it handles up to SafeInteger which covers most cases, however for exact 9223372036854775807 (max safe) we need full support.
      if (!max || n > max) {
        max = n;
      }
    } else {
      // Invalid elements ignored as per spec: "integerとして解釈できない要素も無視します" -> Only match pattern ^-?\d+$ or similar, otherwise skip entirely (not even parseable). Let's use regex more strictly for negative numbers too.
    }
  }

  let count = 0; // Count of valid elements? Actually the problem asks: "element number and max value", so we should also count how many integers were parsed successfully! The first approach above only found MAX without counting all valid ones correctly unless I change structure slightly or just iterate.

  for (const f of parts) {
    if (/^-?\d+$/.test(f)) { // Matches integer pattern including negatives and zero, handles whitespace trim via regex check? No: this checks string content exactly but might include negative sign... Wait input is comma separated! So splitting by commas first then stripping spaces would be better.
      const trimmed = f.trim();
      if (/^-?\d+$/.test(trimmed)) { // Regex match confirms it's an integer pattern (digits only with optional leading minus)
        count++;
      }
    } else { 
      continue; // Ignore non-integer tokens like "abc" or mixed content that doesn't parse to int even if we trimmed? Or maybe just skip invalid lines.
    }
  };

  let finalMax: number | null = null;
  
  for (const f of parts) {
    const valStr = f.trim();
    // Try parsing as integer again strictly. Use regex or try-catch logic to ensure only integers are counted.
    if (/^-?\d+$/.test(valStr)) { 
      count++;
      // Parse carefully: use BigInt for safety since input is up to 64-bit signed int range (approx +/-9*10^18) which exceeds safe integer limit of JS Number (~2e9).
      let nVal = parseInt(valStr, 10); // This fails silently or returns NaN if out of double precision? No: in Node/TS environment, standard parseInt does not return BigInt. 
      // Wait! Spec says values fit within 64-bit integer range. JavaScript Number (Double Precision) can represent up to ~9e15 safely without loss? Actually max safe is roughly 2^53-1 ≈ 9 quadrillion. 64-bit signed int goes up to 9 quintillion (~9 * 10^18). 
      // parseInt on a string like "9007199254740992" (which is > max safe) returns Number.MAX_VALUE or Infinity? Actually it might lose precision.
      // BUT the prompt says: `values are within 64-bit integer range`. So we MUST use BigInt to avoid overflow/loss for values between 10^15 and 10^18.
      
      const big = valStr.trim(); 
      let parsedVal;

    } else {
       continue; // Skip non-integers
    }
    
    try {
       parsedVal = BigInt(big); // Convert string directly to BigInt, safe for any length (though input limited by 64-bit spec)
       
       if (!max || parsedVal > max) {
         max = parsedVal;
       }
       count++;
     } catch(e) {} 
   };

    console.log(`count=${count} max=${Number(max.toString())}`); // Output format: "count=X max=Y". Note the example output used string template. Let's ensure exact formatting.
  });
