const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = s.split(/\r?\n/);
  let countInput = NaN;
  let nTotalLines = 0;

  for (const l of lines) {
    if (l.trim() === "") continue;
    const parts = l.split(/\s+/);
    const first = parseInt(parts[0], 10);
    if (Number.isNaN(first)) continue;
    countInput = first;
    nTotalLines++;
    break;
  }

  let sum = Number.MIN_SAFE_INTEGER;
  let actualCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    for (const p of parts) {
      const n = parseInt(p, 10);
      if (Number.isNaN(n)) continue;
      sum += n;
      actualCount++;
    }
  }

  console.log(`count=${actualCount} sum=${sum}`);
});
