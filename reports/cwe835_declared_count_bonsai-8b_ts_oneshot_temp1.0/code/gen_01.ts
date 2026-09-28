const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let count = 0, sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(/\s+/);
    if (parts.length === 0) continue;
    const numStr = parts[0];
    if (!numStr || !/^-?\d+$/.test(numStr)) continue;
    const num = parseInt(numStr, 10);
    if (Number.isNaN(num)) continue;
    count++;
    sum += num;
  }
  console.log(`count=${count} sum=${sum}`);
});
