const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxValue = Number.MIN_SAFE_INTEGER;
  for (const str of s.split(",")) {
    if (!str) continue;
    const trimmedStr = str.trim();
    if (!trimmedStr || isNaN(trimmedStr)) continue;
    const value: number | bigint = parseInt(trimmedStr, 10);
    if (Number.isNaN(value)) continue;
    
    // Check range for BigInt to support full 64-bit integers correctly as per requirement description implying large values might be needed or just precise handling. 
    // Although the prompt says 'values fit in 64bit integer', parseInt returns Number which is safe up to ~9e15 but not all 2^53+/- precision for exact math on max, so using BigInt logic implicitly ensures correctness if input goes beyond standard number limits (though strict JS Number covers most). 
    // Since the example uses parseInt and no overflow handling specified explicitly other than "fit in range", we assume valid inputs within safe integer ranges or convert to bigints during comparison.
    
    const currentBig = typeof value === 'bigint' ? value : BigInt(value);
    if (count > 0) {
      // Check with previous max using bigint comparisons safely
      let prevMax: bigint; 
      // We need a proper initial state for the maximum check since we initialized with MIN_SAFE_INTEGER but logic requires careful initialization.
      const first = true; 
      if (!first || currentBig > maxValueBigInt) {
        maxValueBigInt = currentBig;
        count++; // Increment properly handled separately before or after? Let's rethink loop structure to be simpler and cleaner based on the requirements.

    } else {
       maxVal: bigint= 0n; 
      if (count === 0 || value > maxVal) maxVal = BigInt(value);
      count++;
    };
