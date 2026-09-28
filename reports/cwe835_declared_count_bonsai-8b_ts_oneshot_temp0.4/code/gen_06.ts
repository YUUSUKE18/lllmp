const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const line of s.split(/\r\n+/)) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;
    const numStr = parts[1];
    if (!/^-?\d+$/.test(numStr)) continue;
    const num = parseInt(numStr, 10);
    if (Number.isNaN(num)) continue;
    count++;
    sum += num;
    first = false;
  }
  if (first) console.log(`count=<0> sum=<0>`);
  else console.log(`count=${count} sum=${sum}`);
});
