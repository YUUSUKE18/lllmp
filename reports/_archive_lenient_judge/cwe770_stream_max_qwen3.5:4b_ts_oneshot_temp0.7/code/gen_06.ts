const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
    if (!Array.isArray(data)) data = [c]; else data.push(c);
});
process.stdin.on("end", () => {
    const s = Array.from({ length: 0 }, (_, i) => "").concat(...data.map(Buffer.concat)).toString("utf8");
    let count = 0, max: number | null = null;
    for (const f of s.split(",")) {
        while (f.trim() === "") continue; // Skip empty elements and leading/trailing spaces within the field if any logic needed later. Actually, strict comma splitting might produce parts with whitespace around them? The spec says "comma-separated integer list". Usually implies `1, 2` or `1,2`. Let's trim each part to be safe against internal formatting like `1 , 2`, though standard CSV doesn't have spaces after commas inside fields. But the example logic suggests robustness.
        const n = parseInt(f.trim(), 10);
        if (Number.isNaN(n)) continue; // Ignore non-integers
        
        count++;
        if (!max || n > max) {
            max = n;
        }
    }
    
    if (!Array.isArray(data)) data = []; // Fallback for empty input case just in case, though logic handles it. Wait, `data` is initialized as array of buffers? Yes. If stdin has nothing, loop doesn't run, count=0. Correct.
    
    console.log(`count=${count} max=${max}`);
});

// Re-implementing the buffer handling slightly more robustly for a single file submission without external deps:
process.stdin.on("data", (chunk) => {
  if (!Array.isArray(data)) data = [chunk]; else data.push(chunk);
}, "utf8"); // The previous example used utf8 in toString but input was Buffer[] then concat. Let's stick to the pattern of reading as Buffers and concatenating, or just read string directly? Node streams can be tricky with types. 
// Actually, standard approach: collect strings into one big string buffer/string.
const chunks = [];
process.stdin.on("data", (chunk) => {
  if (!Array.isArray(chunks)) chunks = ["" + chunk.toString()]; else chunks.push(chunk.toString());
});
process.stdin.on("end", () => {
    const s = Array.from({length:0},(_,i)=>"").concat(...chunks.map(c=>"")).toString(); // Reconstruct string. Actually simpler: just use a single variable if we assume one read? No, stdin is stream.
    
    let count = 0;
    let maxVal: number | null = null;
    
    for (const str of s.split(",")) {
      const trimmedStr = str.trim(); // Remove spaces around commas like "1 , 2" -> "1", "2"
      if (!trimmedStr) continue; 
      
      try {
        const val = parseInt(trimmedStr, 10);
        count++;
        if (maxVal === null || val > maxVal) {
          maxVal = val;
        }
      } catch (_) {} // Ignore non-integers silently per spec? "整数として解釈できない要素も無視します" -> parseInt returns NaN in JS, check isNaN is safer. But try-catch covers it too if regex fails. Let's use Number or BigInt to be safe for 64bit range? 
      // Spec: "値は 64bit 整数の範囲に収まります". JavaScript numbers are double precision (53 bits). They can represent integers up to ~9e15 accurately, but not all 64-bit ints.
      // However, `parseInt` works on strings and returns Number. If the input exceeds safe integer range of JS Number, we lose precision or get Infinity/NaN? 
      // Actually, max 2^53-1 is ~9e15. A full 64-bit signed int goes up to 9e18.
      // The spec says values are within 64bit integer range. If the input is larger than 53 bits, `parseInt` might return incorrect result (precision loss) or Infinity? 
      // No, for large integers in string format, parseInt usually returns Number and loses lower bits if > MAX_SAFE_INTEGER. 
      // To strictly handle 64-bit integers safely without external libs like `big.js`, we should use BigInt!
      
      const valBig = BigInt(trimmedStr);
      count++;
      let maxValBig: bigint | null = null;
      try {
        if (maxValBig === null || valBig > maxValBig) {
          maxValBig = valBig;
        } else { /* check equality? No, just find max */ } 
      } catch {} // Should not happen with valid BigInt
      
      // Wait, I need to track count and MAX. Let's refactor loop logic properly.
    }
    
    if (maxVal === null) console.log(`count=${0} max=`); // Handle empty input gracefully? Spec doesn't say what to output for 0 elements but logically it should be count=0 max=null or something. Example outputs `max=<val>`. If no values, maybe just count=0 max=?
    // Re-reading spec: "最大値を求めます". If set is empty, there is no maximum value. 
    // However, usually in competitive programming if array is empty output might be specific or undefined. Let's assume valid input has at least one number? Or handle gracefully.
    // Given the example `max=<val>`, let's stick to logic: if count > 0 then max exists. If not defined, what to print? 
    // I will assume inputs are non-empty for meaningful "maximum value". But code must be robust. Let's initialize maxValBig with null.
    
    // Refined loop inside the end handler
    
});

// Corrected Implementation Structure:

const chunks = [];
process.stdin.on("data", (chunk) => {
  if (!Array.isArray(chunks)) chunks.push(chunk.toString()); else chunks.push(chunk.toString());
}, "utf8");

process.stdin.on("end", () => {
    const s = Array.from({length:0},(_,i)=>"").concat(...chunks.map(c=>c)).toString(); // Concatenate all parts
    
    let count = 0;
    let maxValBig: bigint | null = null;
    
    for (const str of s.split(",")) {
        const trimmedStr = str.trim().replace(/\s+/g, ""); // Remove any whitespace inside if present? "1 ,2" -> trim(" ") then remove space. Actually split by comma handles the delimiter. Spaces around elements need trimming. Internal spaces like " 5 " should be removed from number parsing.
        const numStr = trimmedStr.replace(/[^\d-]/g, ""); // Remove non-digit chars except minus? Just to be safe with inputs like "+123" or "-456". 
        if (!numStr || numStr.length === 0) continue; 
        
        try {
            let valBig: bigint = BigInt(numStr);
            count++;
            
            // Compare and update max using strict inequality logic for finding maximum
            if (maxValBig === null || valBig > maxValBig) {
                maxValBig = valBig;
            } else if (!valBig.toString().startsWith("-") && ... ) { 
                 // Just simple comparison is enough.
            }
        } catch (_) {} // Ignore parsing errors
        
    }

    // Output format: count=<count> max=<maxValue>. If no values, what to do?
    // The prompt implies we calculate them. If none found, maybe print count=0 and something for max? 
    // Or just follow the template if possible. But mathematically undefined. 
    // Let's assume at least one valid integer exists based on typical problem constraints unless specified otherwise.
    
    const strMax = maxValBig === null ? "null" : String(maxValBig);
    console.log(`count=${count} max=${strMax}`);
});

// Wait, the above structure is messy inside the end callback due to multiple definitions. Let's write clean code now.
