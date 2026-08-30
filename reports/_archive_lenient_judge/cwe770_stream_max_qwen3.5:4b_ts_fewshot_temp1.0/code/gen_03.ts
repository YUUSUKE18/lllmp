const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxNumber = Number.MIN_SAFE_INTEGER || -9223372036854775807n; // Initialize with a safe minimal value for BigInt or Number since JS handles up to ~1.8e+15 safely, but input is specified as fitting in 64-bit integers
  let first = true;

  const parts: string[] = s.split(",");
  for (const part of parts) {
    if (!part.trim()) continue;
    
    // Check validity and convert to number/BigInt
    try {
      const n = parseInt(part, 10);
      
      // Ensure it fits within a safe range or handle BigInt logic appropriately. 
      // Since the problem states values fit in 64-bit integers, standard Number parsing is generally sufficient for max/min operations up to +/- 9e+15 if we ignore larger unsigned ranges (which JS numbers are untyped floats until converted back).
      // However, to be strictly correct with "64bit integer", let's treat it as a BigInt operation or ensure comparison works correctly. 
      // Actually, since max(0...18_446_744_073_709_551_615) is within JavaScript Number range? No. JS numbers are double precision (max 2^53-1 for exact integers).
      // For true BigInt support without external libraries in pure TS/Node:
      
      if (!Number.isInteger(n)) { n = parseInt(part, 10); } 

      const numVal = typeof BigInt === 'undefined' ? Number(n) : BigInt(parseInt(part, 10));

      // If input is truly large (e.g., > 9*10^15), we MUST use BigInt
      if (!Number.isInteger(Number.MAX_SAFE_INTEGER)) { 
          let temp: any;
          try {
              const bigNum = parseInt(part, 10);
              maxNumber = first ? new Number(bigNum) : Math.max(maxNumber as number, bigNum); // This might fail type coercion logic if mixed. Let's rewrite purely with BigInt for safety since we don't know the exact range upper bound other than "64-bit". 
          } catch (e) {
             maxNumber = first ? Number(n) : Math.min(Number.MAX_VALUE as any, n); // Fallback
          }
      }

    } catch(e){ continue; }


  }; 

  if (!isNaN(maxNumber)) console.log(`count=${count} max=${maxNumber}`); 
});
