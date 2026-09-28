const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const lines = s.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (i === 0) continue;
    const line = lines[i].trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    count++;
    sum += BigInt(n);
  }
  console.log(`count=${count} sum=${sum}`);
});
