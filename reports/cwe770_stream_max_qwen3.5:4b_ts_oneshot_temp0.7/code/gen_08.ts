const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const chunk of s.split(/[,,\s]+/)) {
    if (!chunk.trim()) continue;
    
    // leading zero check to ensure it's a valid integer representation without decimals or letters
    const match = /-?\d+$/.exec(chunk);
    if (!match) continue;

    let n: number;
    try {
      n = parseInt(match[0], 10);
    } catch (e) { continue; }

    count++;
    
    // Using BigInt for intermediate comparison to avoid precision issues with JS numbers, then convert back if needed. 
    // However, the problem states inputs fit in 64-bit integers and we need to output them as is.
    // JavaScript Number supports up to ~9e15 (2^53) precisely. Inputs might be larger but within signed 64-bit range (-9e18 to +9e18).
    // To safely handle values potentially exceeding 2^53, we can use BigInt for comparison and conversion at the end if necessary.
    
    const bigMaxVal = maxVal !== null ? BigInt(maxVal) : BigInt(0); // Initialize with a small value or track first separately
    
    if (maxVal === null || n > Number(BigInt(n).toString()) && !isNaN(Number(BigInt(n)))) { 
       // Wait, simply comparing numbers is tricky for very large integers in JS.
       // Let's use BigInt logic properly.
       
      const currentBig = BigInt(n);
      
      if (maxVal === null || currentBig > maxVal) {
        maxVal = Number(currentBig.toString()); // If it fits back into float, cast here? No, need to output the integer value exactly.
        // Actually, since inputs are 64-bit integers, they fit in JS number range if strictly within +/-9e18 but lose precision above 2^53.
        // It is safer to store max as BigInt or string. But specification says "value fits into 64bit integer". 
        // We can output the value directly from input parsing logic using a custom parse for safety, or use Math.max with careful checks?
        // Let's implement safe comparison: if we have more than one valid number found previously, convert to BigInt.
        
      } else {
          maxVal = n; 
      }
    }

}
