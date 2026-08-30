const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(/[,\s]+/);
  
  let sumVal = BigInt(0); // Use BigInt to ensure precision, though problem states fits in 64-bit signed int.
  // However, the output format expects a standard integer representation if it fits, 
  // but intermediate calculations or sums might exceed JS Number limits (2^53).
  // The prompt says "sum falls within 64bit integer range", so BigInt is safe and correct for accumulation.

  const uniqueNumbers = new Set<string>();

  for (const part of parts) {
    if (!part || !Number.isInteger(Number(part))) continue; // Skip empty or non-integer strings
    
    let n: number | bigint = Number(part);
    
    // Although the prompt implies inputs are integers, parseInt handles them. 
    // If we want to strictly treat "整数" as potentially large but fitting in 64-bit signed int range for final sum?
    // The prompt says input is comma-separated integer list. Let's assume they fit in JS Number usually unless specified otherwise.
    // But let's be safe with BigInt arithmetic just in case, then convert to string if it fits or print as bigInt.
    
    uniqueNumbers.add(String(n));

    sumVal += n; 
  }

  const count = uniqueNumbers.size;
  
  console.log(`count=${count} ${sumVal.toString()}`);
});
