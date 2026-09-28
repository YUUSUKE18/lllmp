const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const count = 0, sum = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j];
      if (!part.trim()) continue;
      const num = parseInt(part, 10);
      if (Number.isNaN(num)) continue;
      count++;
      sum += num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
