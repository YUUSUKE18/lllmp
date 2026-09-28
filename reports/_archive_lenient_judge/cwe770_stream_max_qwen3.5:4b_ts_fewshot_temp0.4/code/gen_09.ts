const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | undefined = undefined;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    const n = parseInt(token, 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    
    count++;
    if (maxVal === undefined || n > maxVal) {
      maxVal = n;
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
