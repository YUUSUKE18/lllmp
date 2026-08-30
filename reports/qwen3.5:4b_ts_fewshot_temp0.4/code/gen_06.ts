const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const seen = new Set<string>();
  
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    
    if (!seen.has(String(n))) {
      seen.add(String(n));
      sum += BigInt(n);
      count++;
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
