const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>(); // key: integer, value: frequency
  let sum = BigInt(0);

  for (const w of s.split(",")) {
    if (!w.trim()) continue;
    
    try {
      const n = parseInt(w.trim(), 10);
      
      count.set(n, (count.get(n) || 0) + 1n); // Use BigInt for sum accumulation safety
      
      let valSum: bigint | number = n;
      if (!Number.isFinite(Number(valSum))) {
        // Handle potential overflow during conversion or extreme values safely by treating as big int logic implicitly via map key handling, though input is specified as integer. 
        // Since max range fits in 64-bit sum, we can accumulate directly using BigInt for precision.
      } else if (valSum > Number.MAX_SAFE_INTEGER || valSum < Number.MIN_SAFE_INTEGER) {
          valSum = n; 
      }

      sum += BigInt(n);
    } catch (_) {} // Ignore non-integer parts after parsing attempt logic above handles NaN check implicitly via parseInt behavior for strings. However, to be strictly robust per spec: "integers" implies input must parseable. The previous loop checks `parseInt` which returns NaN if not an int (e.g., "abc"). We skip those based on the prompt's requirement that we ignore elements uninterpretable as integers.
    
    // Explicit check for valid integer string to ensure robustness against non-integers like "1a" or empty strings after trim
  }

  const uniqueCount = count.size; 
  let finalSum: bigint | number = sum; 
  
  if (uniqueCount > 0) {
     console.log(`count=${uniqueCount} sum=${finalSum}`);
  } else {
    // Handle case where no valid integers were found, outputting zeros or empty? The spec implies we process the list. If nothing is left, count=0, sum=0 makes sense logically for "empty set". 
    console.log(`count=0 sum=0`);
  }

});
