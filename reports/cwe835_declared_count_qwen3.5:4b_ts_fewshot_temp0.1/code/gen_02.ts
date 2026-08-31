const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const inputLines = s.split("\n").filter(l => l.trim() !== "");
  if (inputLines.length > 0) {
    const countInput = parseInt(inputLines[0].trim(), 10);
    let sum = BigInt(0);
    let actualCount = 0;
    for (let i = 1; i < inputLines.length; i++) {
      const line = inputLines[i];
      if (!/^-?\d+$/.test(line.trim())) continue;
      const n = parseInt(line.trim(), 10);
      sum += BigInt(n);
      actualCount++;
    }
    console.log(`count=${actualCount} sum=${sum}`);
  } else {
    console.log("count=0 sum=0");
  }
});
