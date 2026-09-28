const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let count = 0, sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const numStr = line;
    if (/^-?\d+$/.test(numStr)) {
      const num = parseInt(numStr, 10);
      if (Number.isNaN(num)) continue;
      count++;
      sum += num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
