const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    
    const parts = line.trim().split(/\s+/);
    if (parts.length === 0) continue;
    
    const n = parseInt(parts[0], 10);
    if (isNaN(n)) continue;
    
    for (const val of parts.slice(1)) {
      const num = parseInt(val, 10);
      if (isNaN(num)) continue;
      count++;
      sum += BigInt(num);
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
