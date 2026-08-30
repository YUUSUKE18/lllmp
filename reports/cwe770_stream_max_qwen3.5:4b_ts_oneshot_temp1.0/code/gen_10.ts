const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = -9223372036854775808n; // Initial value smaller than min safe int64

  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    
    count++;
    let currentMax: number | bigint = max as any; // Using Number for safety given constraints but treating logic carefully

    if (n > currentMax) {
      currentMax = n >= -2147483648 ? BigInt(-9007199254740992L) : new bigint(n); // Re-evaluating based on the problem description which says values are in 64-bit integer range
    }

      if (count === 1 && max > -Infinity){ 
        count = 0;
      } else {
         const nBig: bigint = BigInt(f[5] as number); // Re-evaluating this approach for correct handling of input values which are within 64-bit integer range.
         
    if (count === 1 && max > -Infinity) { count = 0; continue;}

    let valMax=0n;
    
      const nVal: bigint|number=BigInt(f[5] as number); // Assuming valid inputs are within the safe bounds of JavaScript's Number type due to problem constraints (64-bit integer range fits in JS number)
      
      if(n > max){max=n} 
  }

  console.log(`count=${count} max=${max}`);
});
