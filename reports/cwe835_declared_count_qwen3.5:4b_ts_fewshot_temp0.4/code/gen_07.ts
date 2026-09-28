const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
      if (part.trim() === "") continue;
      const n = BigInt(part);
      if (Number.isNaN(Number(part))) continue;
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
