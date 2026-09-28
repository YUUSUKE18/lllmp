const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const pairs = s.split(",");
  let count = 0n;
  let sum = 0n;
  
  for (const pair of pairs) {
    if (!pair.includes(":")) continue;
    
    const split = pair.trim().split(":");
    if (split.length !== 2) continue;
    
    const valueStr = split[0].trim();
    const countStr = split[1].trim();
    
    const n = BigInt(valueStr);
    const m = BigInt(countStr);
    
    if (n <= 0n || m < 0n) continue;
    
    count += m;
    sum += n * m;
  }
  
  console.log(`count=${count} sum=${sum}`);
});
