const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max: bigint | number = Number.MIN_SAFE_INTEGER; // Using MIN_SAFE_INTEGER as a lower bound for comparison logic initially. Actually, since inputs are integers within 64-bit range, we can use BigInt directly if needed or careful JS numbers (safe up to ~9e15). The prompt says values fit in 64bit integer. JavaScript Number is safe up to 2^53-1. For full 64-bit safety with inputs like -9*10^18, we should use BigInt for parsing and comparison if the input can be negative large numbers or exceed 2^53.
  
  // Re-evaluating: The prompt says "values fit within 64bit integer range". 
  // JS Number is safe up to ~9e15 (2^53). If inputs are e.g., -9,000,000,000,000,000,000, we lose precision with Number.
  // To be strictly correct for "64bit integer", let's use BigInt logic or handle carefully. 
  // However, standard JS `parseInt` returns a number. If the input is outside safe integer range but fits in 64-bit int (e.g., -2^53 to -(2^53+1)), Number will lose precision if treated as float? No, parseInt parses string to nearest representable double. 
  // Actually, for inputs like "-9007199254740998" which is > MIN_SAFE_INTEGER but < -MAX_SAFE_INTEGER, JS Number loses the lower bits of integer representation when stored in a float64? No, it stores them as floats. But comparison logic holds if we treat them as numbers. 
  // Wait, "fits within 64bit integer range". This means [-2^53-1000 to -9e18] etc could be present.
  // If I use `Number`, a value like -9e18 is stored exactly? No, double precision has ~15 decimal digits of precision. 
  // Example: Number("-9007199254740993") -> "-9007199254740992". Precision loss occurs for integers > 2^53 in magnitude (approx 9e15).
  // To strictly satisfy "64bit integer", I should use BigInt. But `parseInt` doesn't support base conversion directly to BigInt without helper or regex capture groups with bigInt? 
  // Actually, we can parse as string and convert using BigInt if the input is large enough. Or just assume inputs are within safe range for typical test cases unless specified otherwise.
  // BUT: "values fit within 64bit integer" implies they might exceed JS Number's precision limit (2^53). 
  // So I will implement a robust parser using BigInt logic if possible, or simply rely on the fact that `Number` is often sufficient for competitive programming unless specifically targeting edge cases.
  // Let's try to be safe: use regex match and convert via custom function? Or just assume inputs are valid integers within range where Number works OR we need BigInt.
  
  // Simplest robust way without external libs: 
  // Use `BigInt` conversion if the string length is > ~16 digits, else parse as number? No, that's messy.
  // Actually, for "count" and "max", count fits in int32 usually (unless huge input), max fits in 64-bit signed int. 
  // Let's assume inputs are within safe integer range for simplicity unless we want to over-engineer. 
  // However, the prompt explicitly mentions "64bit integer". This is a hint that precision might be an issue with standard Number if negative large numbers exist.
  
  // Correct approach: Parse as string -> BigInt? But `BigInt` constructor takes number or string. String works perfectly for any length!
  // So I will parse into strings first, filter valid integers (optional sign), then convert to BigInt for max calculation and count logic. 
  // Wait, output format is text. Count can be large too if many elements? "Elements" usually implies a list of numbers in input stream. If the line has millions of commas, count could exceed Number.MAX_SAFE_INTEGER? Unlikely for typical tasks but possible.
  // Let's use BigInt for both max and potentially count to be safe. 
  // But output format `count=<n>`. If n is huge string, it prints fine.
  
  let currentMax: bigint = -BigInt("9007199254740993") - 1; // Initialize with a value smaller than any possible valid input (MIN_SAFE_INTEGER approx) or just use first element logic. 
  // Actually, initializing max is tricky if we don't have elements yet. Better to track `max` as the result of parsing the first valid number found.
  
  let count = BigInt(0);
  const parts: string[] = [];

  for (const token of s.split(/\s+/)) {
    // Remove commas? No, input is comma-separated integers like "1,2,3". 
    // The split logic above splits by whitespace. We need to handle the internal structure too.
    // Wait, example: "1, 2 , 3" -> parts=["1,", " ", "2", ",", ...]? No.
    // Better approach: Replace all commas with spaces then split? 
    // Or regex replace comma with space before splitting by whitespace.
    
    if (token.includes(',')) {
      const nums = token.split(',');
      for(const n of nums) parts.push(n.trim());
    } else {
      parts.push(token);
    }
  }

  let maxVal: bigint | null = null; // Use BigInt for safety with large integers
  
  for (const f of parts) {
    if (f.length === 0 || !/^-?\d+$/.test(f)) continue; // Skip empty or non-integer strings
    
    const nStr = f.trim();
    let val: bigint | number;
    
    try {
      val = BigInt(nStr); 
    } catch(e) { /* Should not happen if regex passed */ }

    count++;
    if (maxVal === null || val > maxVal) {
      maxVal = val;
    }
  }

  // Handle case where no valid integers were found? Prompt implies input has elements. 
  // If no numbers, what to output? Assuming at least one number exists based on typical constraints or handle gracefully.
  if (maxVal === null) {
     console.log(`count=0 max=`); // Or maybe just count=0 max=<undefined>? Let's assume valid input with at least one num per spec "integer list". 
     return; // Wait, must output exactly one line even for empty? If no numbers found.
  }

  const strMax = String(maxVal);
  console.log(`count=${count} max=${strMax}`);
});
