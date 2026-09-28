const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/[\s,]+/).map(p => p.trim()).filter(p => p !== "");
    if (parts.length === 0) continue;
    const firstPart = parts[0];
    if (!Number.isInteger(Number(firstPart)) || Number(firstPart) < 0) continue;
    const expectedCount = Number(firstPart);
    for (let i = 1; i < parts.length; i++) {
      const val = parseInt(parts[i], 10);
      if (Number.isNaN(val)) continue;
      count++;
      sum += BigInt(val);
    }
    if (count > expectedCount) break;
  }
  console.log(`count=${count} sum=${sum}`);
});
