const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n|\n+/);
  let count = 0, sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    count++;
    sum += n;
  }
  console.log(`count=${count} sum=${sum}`);
});
