const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxNumber: number | null = null;

  for (const ch of s.split(",")) {
    if (/^\s*$/.test(ch.trim())) continue;
    
    const n = parseInt(ch, 10);
    if (!isNaN(n) && isFinite(n)) {
      count++;
      if (maxNumber === null || n > maxNumber) {
        maxNumber = n;
      }
    }
  }

  console.log(`count=${count} max=${maxNumber}`);
});
