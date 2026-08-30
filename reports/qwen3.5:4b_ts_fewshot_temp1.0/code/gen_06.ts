const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const counts = new Map<number, bigint>();
  let sum = BigInt(0);

  for (const w of s.split(",")) {
    if (!w.trim()) continue;
    const n = parseInt(w.trim(), 10);
    if (Number.isNaN(n) || isNaN(parseInt(w.trim(), 10))) continue;
    
    const cnt = counts.get(n) ?? BigInt(0);
    counts.set(n, cnt + 1n);
    sum += BigInt(n);
  }

  let count = 0;
  for (const _ of counts.values()) {
    count++;
  }

  console.log(`count=${count} sum=${sum}`);
});
