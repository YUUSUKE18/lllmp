const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let line = 0;
  for (const ch of s) if (ch === "\n") line++;
  for (let i = 0; i < line; i++) {
    const lineStr = s.substring(i * 1000 + 1, (i + 1) * 1000 + 1);
    if (lineStr.trim() === "") continue;
    const n = parseInt(lineStr, 10);
    if (n === undefined) continue;
    count++;
    sum += n;
  }
  console.log(`count=${count} sum=${sum}`);
});
