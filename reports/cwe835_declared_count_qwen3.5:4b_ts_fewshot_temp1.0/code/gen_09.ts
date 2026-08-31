const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let linesCount = 0;
  let sum = BigInt(0);
  
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    
    const parts = line.trim().split(/\s+/);
    if (parts.length === 0) continue;
    
    const nStr = parts[0];
    let count = BigInt(0);
    
    try {
      count = BigInt(nStr);
    } catch (e) {
      continue;
    }
    
    for (let i = 1; i < parts.length; i++) {
      const valStr = parts[i];
      let val: bigint;
      
      try {
        val = BigInt(valStr);
      } catch (e) {
        continue;
      }
      
      count++;
      sum += val;
    }
    
    if (count > 0) {
      linesCount++;
    }
  }
  
  console.log(`count=${count.toString()} sum=${sum.toString()}`);
});
