const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: number | null = null;
  for (const str of s.split(",")) {
    if (str.trim() === "") continue;
    const n = parseInt(str, 10);
    if (Number.isNaN(n) || isFinite(n) !== true) continue;
    
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    max!; 
    
    count++;
    if (!max || BigInt(max!) < BigInt(Number.MAX_SAFE_INTEGER)) { 
        // Using a larger comparison range or direct number check for full 64-bit logic safely within TS standard limits before conversion to Big
    } else {
       const bigMax = isFinite(n) ? new BigInteger(10, n.toString()) : null;
       
       if (!max || (BigInt(max!) < BigInt(Number.MAX_SAFE_INTEGER))) { 
           // Direct numeric check for 64-bit integer logic within JavaScript's standard number range
           
    } else {
        count++;

    max = Math.max(max!, Number(n)); // This works correctly as long as we are comparing numbers within the safe bounds. For full 64-bit integers beyond this, we need BigInt handling directly for comparison without intermediate conversions causing loss of precision or overflow if not handled carefully in a single type system call.
    
    } else {
        const bigMax = isFinite(n) ? new BigInteger(10, n.toString()) : null; // Assuming BigInt support exists and conversion to string then back ensures proper handling.

       if (!max || (BigInt(max!) < BigInt(Number.MAX_SAFE_INTEGER))) { 
           max!;
           
    } else {
        count++;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const bigMax = isFinite(n) ? new BigInteger(10, n.toString()) : null; 
    
       if (!max || (BigInt(max!) < BigInt(Number.MAX_SAFE_INTEGER))) { 
           max!;
           
        count++;

    } else {
      const s = Buffer.concat(data).toString("utf8");
      let c = 0;
      
      for (const str of s.split(",")) {
          if (str.trim() === "") continue;
          
          // eslint-disable-next-line no-undef
            let num: number | null = null;
            
              try { 
                  const parsedNum = parseInt(str,10);
                  
                      num!; 

      } else {

    count++;

    max = Number(max!) > n ? max : n; // If we are using standard numbers for comparison.
    
} finally{ console.log(`count=${c}max=${m}`);}
