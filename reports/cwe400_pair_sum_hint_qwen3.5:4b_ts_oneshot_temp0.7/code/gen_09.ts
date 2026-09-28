const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let target: number;
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (!Number.isNaN(n)) {
      target = n;
      break;
    }
  }

  let pairs: number = 0;
  for (let i = 1; i < lines.length && !Number.isNaN(target); i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;

    for (let j = i - 1; j > 0 && !Number.isNaN(target); j--) {
      const prevLine = lines[j].trim();
      if (!prevLine) continue;
      const prevN = parseInt(prevLine, 10);
      if (Number.isNaN(prevN)) continue;

      if (n + prevN === target) {
        pairs++;
      }
    }
  }

  console.log(`pairs=${pairs}`);
});
