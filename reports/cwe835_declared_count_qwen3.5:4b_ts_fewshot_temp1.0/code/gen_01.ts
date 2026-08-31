const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let count = 0;
  let sum = 0 as bigint;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
      if (part.trim() === "") continue;
      const n = BigInt(parseInt(part, 10));
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
