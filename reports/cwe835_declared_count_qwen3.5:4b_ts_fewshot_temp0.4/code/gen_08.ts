const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  
  for (const line of s.split("\n")) {
    if (line.trim() === "") continue;
    
    const parts = line.split(/\s+/);
    for (const part of parts) {
      if (part.trim() === "") continue;
      
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      
      count++;
      sum += BigInt(n);
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
