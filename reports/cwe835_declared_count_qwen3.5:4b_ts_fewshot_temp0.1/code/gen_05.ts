const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const inputLines = s.split("\n").filter(l => l.trim() !== "");
  if (inputLines.length > 0) {
    const n: number = parseInt(inputLines[0].trim(), 10);
    let count = 0;
    let sum = 0n;
    for (let i = 1; i < inputLines.length; i++) {
      const line = inputLines[i];
      if (!line.trim()) continue;
      const parts = line.split(/\s+/);
      for (const p of parts) {
        const val = parseInt(p, 10);
        if (Number.isNaN(val)) continue;
        count++;
        sum += BigInt(val);
      }
    }
    console.log(`count=${count} sum=${sum}`);
  } else {
    console.log("count=0 sum=0");
  }
});
