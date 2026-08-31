const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = s.split(/\r?\n/);
  let countLines = 0;
  for (const l of lines) {
    if (l.trim() === "") continue;
    try {
      countLines = parseInt(l, 10);
      break;
    } catch {
      continue;
    }
  }
  let sum: number | bigint = 0n;
  let actualCount = 0;
  for (let i = countLines + 1; i < lines.length && actualCount < countLines; i++) {
    const l = lines[i];
    if (l.trim() === "") continue;
    try {
      const n = parseInt(l, 10);
      if (Number.isNaN(n)) continue;
      sum += BigInt(n);
      actualCount++;
    } catch {
      continue;
    }
  }
  console.log(`count=${actualCount} sum=${BigInt(sum)}`);
});
