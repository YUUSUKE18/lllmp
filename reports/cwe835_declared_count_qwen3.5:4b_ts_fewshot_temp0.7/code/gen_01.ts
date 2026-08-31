const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let countLines = 0;
  if (lines.length > 0 && lines[0].trim() !== "") {
    try {
      countLines = parseInt(lines[0], 10);
    } catch { /* ignore */ }
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    try {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) {
        nums.push(n);
      }
    } catch { /* ignore */ }
  }

  let sum = 0n;
  for (const n of nums) {
    sum += BigInt(n);
  }

  console.log(`count=${nums.length} sum=${sum}`);
});
