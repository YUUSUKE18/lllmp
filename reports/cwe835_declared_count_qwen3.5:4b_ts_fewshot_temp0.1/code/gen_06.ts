const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const inputLines = s.split("\n").filter(l => l.trim() !== "");
  if (inputLines.length > 0) {
    const n: number = parseInt(inputLines[0].trim(), 10);
    let sum = 0;
    for (let i = 1; i < inputLines.length && i <= n + 1; i++) {
      const line = inputLines[i];
      if (line.trim() === "") continue;
      const parts = line.split(/\s+/);
      for (const p of parts) {
        const val = parseInt(p, 10);
        if (!Number.isNaN(val)) {
          sum += val;
        }
      }
    }
    console.log(`count=${lines} sum=${sum}`);
  } else {
    console.log(`count=0 sum=0`);
  }
});
