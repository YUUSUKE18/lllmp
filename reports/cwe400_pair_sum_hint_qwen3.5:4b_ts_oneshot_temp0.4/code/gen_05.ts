const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: bigint | undefined;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const val = BigInt(line.trim());
    if (!isNaN(val)) {
      target = val;
      break;
    }
  }
  
  if (target === undefined) {
    console.log("pairs=0");
    return;
  }

  let count: bigint = 0n;
  const seen = new Set<bigint>();
  let sum: bigint = 0n;

  for (const line of lines.slice(1)) {
    if (line.trim() === "") continue;
    const val = BigInt(line.trim());
    if (isNaN(val)) continue;

    // 足し算の逆元を探す
    const needed = target - val;
    
    // seen に存在する値があるか確認
    for (const sVal of seen) {
      if (sVal === needed) {
        count++;
      }
    }
    
    seen.add(val);
  }

  console.log(`pairs=${count}`);
});
