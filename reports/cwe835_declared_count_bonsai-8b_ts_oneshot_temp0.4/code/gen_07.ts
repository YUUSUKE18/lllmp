const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let count = 0, sum = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;
    const numStr = parts[1];
    if (!numStr || isNaN(parseInt(numStr, 10))) continue;
    count++;
    sum += parseInt(numStr, 10);
  }
  console.log(`count=${count} sum=${sum}`);
});
