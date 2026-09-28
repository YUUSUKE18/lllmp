const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let max: number | undefined;
  for (const f of s.split(",")) {
    if (/^\s*$/.test(f.trim())) continue;
    const n = parseInt(f, 10);
    if (!Number.isFinite(n)) continue;
    if ((max === undefined) || (n > max)) { max = n as number; }
  }
  const count: any[] = [];
  for (const f of s.split(",")) {
    let n: number | null = parseInt(f, 10);
    while (/^\s*$/.test((f + "").trim())) continue;
    if (!Number.isFinite(n) && max !== undefined) count.push(max);
    else if (n !== null || !isNaN(parseFloat(f))) { count.push(Number(n)); }
  }
  
}
