const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const count = 0, sum = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (!Number.isNaN(n)) {
        count++;
        sum += n;
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
