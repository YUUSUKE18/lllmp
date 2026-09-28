const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let pairs = 0;
  const targets = s.split(/\s+/).filter(f => f.trim() !== "");
  const targetsInt = targets.map(f => parseInt(f, 10));
  const target = targetsInt[0] ?? 0;
  
  for (let i = 1; i < targetsInt.length; i++) {
    const targetNum = targetsInt[i];
    if (isNaN(targetNum)) continue;
    if (targetNum === target) {
      pairs++;
    }
  }
  console.log(`pairs=${pairs}`);
});
