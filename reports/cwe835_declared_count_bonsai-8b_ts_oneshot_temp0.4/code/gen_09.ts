const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n+/);
  const count = 0, sum = 0;
  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;
    const numStr = parts[1];
    const num = parseInt(numStr, 10);
    if (Number.isNaN(num)) continue;
    count++;
    sum += num;
  }
  console.log(`count=${count} sum=${sum}`);
});
