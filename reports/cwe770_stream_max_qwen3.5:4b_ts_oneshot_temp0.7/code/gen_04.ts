const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal = Number.MIN_SAFE_INTEGER; 
  // 空の配列の場合、最大値は未定義だが出力形式を維持するため最小安全整数を使用（または初期化）
  if (s.trim() === "") {
    console.log(`count=0 max=${Number.MIN_SAFE_INTEGER}`);
    return;
  }

  const parts = s.split(",");
  
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length === 0 || isNaN(trimmed)) continue;
    
    // BigInt を使用して 64bit 整数の範囲を厳密に扱う（JavaScript の Number は精度制限があるため）
    let val: bigint | number = null;
    try {
      const bigVal = parseInt(trimmed, 10);
      if (BigInt.isSafeInteger(bigVal)) {
        // safe integer range check to ensure it fits in standard JavaScript number for comparison simplicity but we store as BigInt logic or use Number carefully. 
        // Actually, since input is within 64-bit signed int range (-2^53 to +2^53 approx), regular JS numbers are sufficient if handled correctly.
      } else {
         val = bigVal;
      }
    } catch (e) {}

    let n: number | bigint = Number(trimmed); // Standard parseInt returns a number, which is safe for 64-bit integers in modern engines up to ~9*10^27. 
                                                  // The prompt says "fits within 64bit integer range", so standard JS Number (IEEE 754) can represent exact values of integers between -2^53 and +2^53-1 exactly, but not all 64-bit ints up to +/-9*10^18.
                                                  // However, the input constraint "fits within 64bit integer" implies it might exceed 2^53? 
                                                  // Actually JS Number can hold integers up to ~9e27 safely if no operation is performed on them beyond simple storage? No.
                                                  // The safe range for exact representation without loss of precision in JavaScript numbers is -2^53 to +2^53-1 (approx +/- 9,007,199,254,740,992). 
                                                  // If the input requires full 64-bit signed integer range (-2^63 to 2^63-1), we must use BigInt.
  
    if (!Number.isFinite(n)) continue;

    count++;
    
    let currentMax: number = Number.MIN_SAFE_INTEGER + (count > Math.floor(Number.MAX_VALUE/50) ? 1 : 0); // This logic is flawed, reset properly below
    
    // Let's restart the loop with clean logic using BigInt for comparison if needed or just standard numbers since input fits in 64-bit int which JS Number can't fully represent exactly beyond +/-9e18.
    // Wait, max value of signed 32-bit is ~2b, but prompt says "fits within 64bit integer". 
    // Example: -9223372036854775808 to 9223372036854775807.
    // JS Number precision issue starts at ~9e15. So we MUST use BigInt for accurate comparison if input > +/- 9e15.
    
    let isMax = false;
    if (count === 1) {
      currentMax = n as number | bigint; 
    } else {
       // We need to track max correctly with BigInts potentially? Or just use Number.MAX_VALUE logic?
       // Let's re-evaluate: If input fits in 64-bit int, it could be outside JS safe integer range.
       // So let's initialize maxVal as a very small number or handle first element specially using BigInt logic if necessary.
       
       const nBig = typeof n === 'bigint' ? (n as bigint) : Number(n); 
       // Actually parseInt returns a string -> number conversion might lose precision for 64-bit int > 2^53.
       // But wait, the prompt says "fits within 64bit integer". It doesn't guarantee it's small enough for JS Number exactness if we are not careful? 
       // No, parseInt("9007199254740998") returns a number that is NOT accurate.
       
       // Correct approach: Parse as string then convert to BigInt or handle carefully.
    }
    
    // Re-doing the loop logic properly inside one go
    
  }

  let max = Number.MIN_SAFE_INTEGER; 
  count = 0; 
  
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || !Number.isNaN(Number(trimmed))) continue; // Wait, isNaN is wrong check here. Should be valid number check.

    let val: bigint | undefined;
    try {
      val = BigInt(parseInt(trimmed)); 
    } catch (e) {}
    
    // If parseInt fails or result isn't integer? The prompt says "integer list". 
    if (!val || typeof val !== 'bigint') continue; 
    
    count++;

    let currentMax: bigint | number = Number.MIN_SAFE_INTEGER + 1n; 

    // Check first element logic properly
    const nBigVal = parseInt(trimmed);
    
    // To handle the initial max correctly without assuming order or size, we can set a flag.
    if (count === 0) {
      currentMax = val as bigint | number; 
    } else {
       let existingMax: bigint | undefined = Number.MIN_SAFE_INTEGER + 1n; // Placeholder
      
       // Let's rewrite the whole thing cleanly in one block to avoid variable scope issues.
       
    }
    
    if (count === 0) max = val as number; 
    else if ((val as bigint < existingMax)) {} 

}

// Final clean implementation below:
