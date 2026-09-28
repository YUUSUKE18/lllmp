const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const rawLines = s.split("\n").filter(line => line.trim() !== "");
  if (rawLines.length === 0 || !Number.isInteger(Number(rawLines[0]))) {
    console.log("count=0 sum=0");
    return;
  }
  const expectedCount: number = Number(rawLines[0]);
  let count = 0;
  let sum = BigInt(0);
  for (let i = 1; i < rawLines.length; i++) {
    const line = rawLines[i].trim();
    if (!/^-?\d+$/.test(line)) continue;
    const n = Number(line);
    sum += BigInt(n);
    count++;
  }
  console.log(`count=${count} sum=${sum}`);
});
