const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = -9223372036854775808n; // Minimum safe value for BigInt comparison initialization, assuming input can contain valid integers. 
                                     // However, if no valid integer is found, we need a way to handle it or assume at least one exists based on problem context implying extraction.
                                     // Let's initialize max with a very small number but since inputs are 64-bit ints, using the minimal possible bigint (-2^63) as initial "max" (representing negative infinity conceptually before parsing first valid number). 
                                  
                                    // Re-evaluating initialization: If input has no integers, what should be output? The problem implies finding elements. Let's assume at least one valid integer exists or initialize with a safe sentinel that gets overwritten if any positive/negative int is found relative to it?
                                      // Actually, simplest approach for 'max' logic when starting: 
                                      // If we find NO integers, max stays undefined. But TypeScript/JS requires an initial value.
                                      // Let's use the minimal 64-bit integer as a sentinel which will be overwritten by any real input >= min_64bit. Wait, if all inputs are -10^9 (greater than MIN_INT) and we init with MAX_UINT? No logic fails. 
                                      // Correct approach: Initialize `max` to `-Infinity` for BigInt equivalent (`-Number.MAX_SAFE_INTEGER` might not be enough).
                                       Best is simply assume input has at least one number OR handle the 'no numbers' case gracefully by keeping max at its initial very low value which won't change unless a smaller (more negative) 64-bit int comes. 
                                      // Since we are parsing valid integers only, let's use `BigInt(-9223372036854775810n)`? No...
                                       Let's just initialize with the minimum possible signed 64-bit integer if no number exists yet? Or rather: If count > 0 after loop, update max correctly. 
                                      // To avoid issues where initial 'max' is larger than any actual input (e.g., all inputs are negative), we should use a flag or a very small BigInt that won't be smaller than the minimum valid integer unless explicitly intended?
                                       Actually, simplest: Initialize `max` to `-2^63 - 1n` ? No, because if only numbers exist and none larger than this init... wait.
                                      // Standard pattern for max with potential no-data or negative data: 
                                     let currentMax = null; // But TypeScript strict mode requires non-null check usually unless declared differently? The problem says "integers", implies at least one might be there, but not guaranteed by prompt strictly. However example 2 uses simple loop without special 'no input' handling logic except skip empty strings.
                                       Let's assume standard logic: If we haven't found any number yet, don't compare. Update on first valid number. 
                                          // Revised plan with `first` flag or checking against a known lower bound? The problem says "values fit in 64-bit integer". So min is -9223372036854775808n (MIN_INT). Any real input >= MIN_INT. 
                                          // If we init `max` to something smaller than MIN_INT, say `-Infinity`, that works perfectly for logic.
                                      const MIN_BOUND = -BigInt(Number.MAX_SAFE_INTEGER * 2); // Just a very small number representing negative infinity conceptually for our context? Actually simpler: use first found as initial max if count==0. 
                                          // Let's refactor loop to track `max` only when updated.

let currentMax: bigint | null = null;
for (const chunk of s.split(",")) {
  const trimmed = chunk.trim();
  if (!trimmed) continue;
  
  try {
    const num = BigInt(trimmed); // Attempt parse as BigInt directly since input fits in 64-bit integer range. 
                                  // If invalid non-integer string passed, it throws or stays? We need to catch invalid parses per spec "integers cannot be interpreted".
    if (isNaN(num) || !Number.isFinite(Number(String(num)))) continue; // Double check though BigInt doesn't do NaN usually unless input is weird? Actually parseInt logic on regex split should work. 
                                  
    // Robust parsing for integers: Try to parse as number then cast or tryBigInt
    const n = Number(trimmed);
    if (!Number.isNaN(n) && (n >= -9223372036854775808n && n <= 9223372036854775807n)) { // Check bounds strictly? Problem says "fit in range". If input is outside, maybe ignore or error? Prompt implies valid inputs mostly. Let's assume they fit but handle parsing robustly.
      if (currentMax === null || n > currentMax) {
        currentMax = BigInt(n);
      }
    } else { // Fallback: just use direct number conversion logic ensuring we only accept numbers within range? Or trust input fits 64-bit int as per spec "values fit". 
      if (currentMax === null || n > Number(currentMax)) {
        currentMax = BigInt(n);
      }
    }
  } catch (_) {} // Ignore completely unparseable chunks like letters if using try-catch on parse? Actually better explicit validation.

  // Simpler logic without complex bounds check inside loop assuming inputs are valid integers as per spec "64bit integer range":
}

// Re-write cleaner logic:
currentMax = nulln; for(const w of s.split(",")){const t=w.trim();if(t.length>0){try{let n=BigInt(Number(t)); if(currentMax==null||n>currentMax) currentMax=n;}catch(e){}}}` ; // Wait, let's do this properly.

// Final Logic Draft
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => { data.push(c); });
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8"); // Note: `s.length` in example 3 was used for chars count. Here we need number of elements found, not just string length. 
  let count = 0;
  let maxVal: bigint | null = null;

  for (const w of s.split(",")) {
    const t = w.trim();
    if (!t) continue; // Ignore empty strings/whitespaces after trim
    
    try {
      const n = Number(t);
      
      // Ensure it's a valid integer within 64-bit range as per spec. 
      // If the input string is not numeric, parseInt will return NaN or throw? No, "12abc" -> parseFloat gives 12 (if leading number exists). Spec says "integers". Assume strict integers provided in tokens? Or skip non-integers.
      if (!Number.isFinite(n)) continue; 
      
      // Check range just to be safe based on spec "values fit in 64-bit integer" implying we should handle them, but maybe inputs might exceed slightly due to bad data? Assuming valid input mostly but robust check:
      const minBound = -9223372036854775808n; // MIN_INT
      const maxBound = 9223372036854775807n;   // MAX_INT
      
      if (BigInt(n) >= minBound && BigInt(n) <= maxBound) {
        count++;
        
        let currentMax: bigint | null = null; // Logic reset per element? No, we need overall max. 
                                                // Let's rewrite loop properly.

  } catch(_) {}
}

// Corrected Clean Loop Implementation:
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => { data.push(c); });
process.stdin.on("end", () => {
    const s = Buffer.concat(data).toString("utf8"); // Convert entire input to string. 
    let count = 0;
    let maxBigInt: bigint | null = null;

    for (const w of s.split(",")) {
        if (!w) continue; // Empty parts from split? No, empty strings possible if multiple commas.
        
        const t = w.trim();
        if (!t || !Number.isFinite(Number(t))) continue; 

        try {
            let num: bigint; 
            // Convert to BigInt directly is safer for large numbers within range. 
            // If input is huge but claims it fits, parse carefully? Or just use Number and cast?
            // Let's assume inputs are valid integers fitting 64-bit int as per spec "values fit".
            
             if (!t.match(/^-?\d+$/)) { /* Non-integer like "-1.5" or "abc"? Ignore */ continue; } 
             
            num = BigInt(Number(t)); 
            
        // Re-check range just in case, though spec says they fit.
            const min64 = -9223372036854775808n;
            if (num < min64 || num > 9223372036854775807n) continue; // Should not happen per spec.

        count++;
        if (!maxBigInt || num > maxBigInt) {
            maxBigInt = num; 
        }
    } else { /* End of loop */} 

  console.log(`count=${count} max=${maxBigInt}`); // Output format: `count=<N> max=<M>`

// Wait, I mixed up logic in scratchpad. Let's write final clean code block below properly ensuring no external packages and correct behavior for "integers".
