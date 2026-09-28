const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = BigInt(0);
  const lines = s.trim().split(/\r?\n/);
  
  if (lines.length > 0) {
    const nVal = parseInt(lines[0], 10);
    if (!Number.isNaN(nVal)) count = BigInt(nVal);
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (!Number.isNaN(n)) {
        sum += BigInt(n);
        count++;
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
