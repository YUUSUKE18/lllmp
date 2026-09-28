const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const count = 0;
  let sum = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;
    const numStr = parts[1];
    if (!/^-?\d+$/.test(numStr)) continue;
    const num = parseInt(numStr, 10);
    if (Number.isNaN(num)) continue;
    count++;
    sum += num;
  }
  console.log(`count=${count} sum=${sum}`);
});
