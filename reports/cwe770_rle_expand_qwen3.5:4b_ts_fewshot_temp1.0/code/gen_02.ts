const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0;
  
  for (const item of s.split(",")) {
    if (!item.trim()) continue;
    
    const [valStr, cntStr] = item.trim().split(":");
    if (valStr === undefined || cntStr === undefined) continue;
    
    const val = parseInt(valStr, 10);
    const cnt = parseInt(cntStr, 10);
    
    if (Number.isNaN(val) || Number.isNaN(cnt)) continue;
    
    count += cnt;
    sum += val * cnt;
  }
  
  console.log(`count=${count} sum=${sum}`);
});
