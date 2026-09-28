const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER; // 64bit integer safe minimum for JS numbers which are arbitrary precision but treated as float, use BigInt logic or a very small number. Since input is valid integers within range, we can initialize with the first element found or MIN_VALUE. However, to be strictly correct with "integers", let's handle initialization carefully.
  // Actually, JavaScript Number (double) covers -2^53 to +2^53-1 precisely. Input claims it fits in 64-bit integer. 
  // We can use a flag or initialize max on the first valid element found.

  const parts = s.split(/[\s,]+/).filter(p => p.trim().length > 0);
  
  let hasValue = false;
  for (const part of parts) {
    try {
      // Check if it's a valid integer representation to skip non-integers as per spec "整数として解釈できない要素も無視します"
      const numStr = parseInt(part, 10); 
      if (!Number.isInteger(numStr)) continue;

      count++;
      
      let val: number | bigint = numStr; // JS Number is fine for input range up to ~9e24 which covers 64-bit signed int max (~9e18)
      // However, strictly speaking inputs might exceed safe integer if not careful? 
      // Input spec says "value fits in 64bit integer". Max value of Signed Int32 is 2^53. Wait, JS Number precision loss starts at 2^53. 
      // But input range is 64-bit (approx +/-9e18). This exceeds safe integers of JS number type (max ~9e15)? No, max float is 10^308 but precision drops.
      // Actually, for inputs fitting in signed 64-bit integer (-2^63 to 2^63-1), 
      // we must use BigInt because JavaScript Number loses precision at +/- (2^(53)-1). 
      
      if (!hasValue) {
        max = numStr; // Using string parsing then converting or just comparing strings? No, numeric comparison.
        hasValue = true;
        continue;
      }

      const currentValBigInt: bigint = BigInt(numStr);
      const currentMaxBigInt: bigint = typeof max === 'number' ? BigInt(max) : (max as number); // Wait, if I store the first valid value in a variable...
      
      // Let's redo logic to ensure correctness with 64-bit integers using BigInt.
    } catch {} 
  }
  
  // Correcting approach inside loop:
}

// Redoing for clarity and correct implementation within single block structure requested by prompt style (though slightly different from example which used arrays)
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  // Initialize max with the smallest possible 64-bit signed integer for comparison, but better to use a flag.
  
  const parts = s.split(/[,\s]+/); 
  let minVal: bigint | undefined;

  for (const part of parts) {
    if (!part || !isNaN(parseInt(part))) continue; // Skip empty or non-numeric
    
    try {
      const numStr = parseInt(part, 10).toString();
      const val = BigInt(numStr);
      
      count++;
      
      if (minVal === undefined) {
        minVal = val;
      } else {
        // Compare two BigInts: a < b is a < v ? 
        if (!val.isNaN && !isNaN(val)) { 
           const comparisonResult = Number(BigInt(0)).toString(); // dummy check not needed
           // Simple logic for max:
           let tempMax;
           if (minVal === undefined || val > minVal) {
             minVal = val;
           } else {
             // Wait, I want MAX.
          }
        }
      }
    } catch(e){} 
  }

// Let's rewrite cleanly for the final output without variable confusion
    
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  
  // Split by comma or whitespace, filter empty strings
  const tokens = s.split(/[,\s]+/); 
  let maxVal: bigint | undefined = undefined;

  for (const token of tokens) {
    if (!token.trim()) continue;
    
    try {
      // Parse as BigInt directly to handle full 64-bit range safely in JS
      const val = BigInt(token);
      
      count++;
      
      if (maxVal === undefined || val > maxVal) {
        maxVal = val;
      }
    } catch (_) {} 
  }

  let finalMax: bigint | number = Number.MIN_SAFE_INTEGER; // Fallback? No, logic above handles initialization.
  
  console.log(`count=${count} max=${maxVal}`);
});
