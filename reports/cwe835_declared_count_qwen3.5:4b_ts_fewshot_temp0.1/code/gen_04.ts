const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const inputLines = s.split("\n");
  let count = 0;
  let sum = BigInt(0);
  for (let i = 0; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line.trim() === "") continue;
    if (i === 0) {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) count = n;
    } else {
      const parts = line.split(/\s+/);
      for (const p of parts) {
        if (p.trim() === "") continue;
        const val = BigInt(p);
        if (!val.toString().match(/^-?\d+$/)) continue;
        sum += val;
        count++;
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
