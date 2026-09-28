const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let count = 0;
  let sum = BigInt(0);
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    const n1 = parseInt(parts[0], 10);
    if (isNaN(n1)) continue;
    for (let i = 1; i < parts.length; i++) {
      const v = BigInt(parts[i]);
      if (!Number.isInteger(Number(v))) continue;
      count++;
      sum += v;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
