const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let first = true;
  for (const line of s.split(/\r\n+/)) {
    if (line.trim() === "") continue;
    const numStr = line.trim().split(/\s+/);
    if (numStr.length === 0) continue;
    const numStr = numStr[0];
    if (/^-?\d+$/.test(numStr)) {
      const num = parseInt(numStr, 10);
      if (Number.isNaN(num)) continue;
      count++;
      sum += num;
      first = false;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
