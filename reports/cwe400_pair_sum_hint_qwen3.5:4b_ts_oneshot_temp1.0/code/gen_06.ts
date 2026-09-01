const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let target = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    target = parseInt(line, 10);
    if (!Number.isNaN(target)) break;
  }
  if (target === null) {
    console.log("pairs=0");
    return;
  }
  const values: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (i === 0) continue;
    const line = lines[i].trim();
    if (line === "") continue;
    const v = parseInt(line, 10);
    if (!Number.isNaN(v)) {
      values.push(v);
    }
  }
  let count = 0n;
  for (let i = 0n; i < BigInt(values.length); i++) {
    for (let j = i + 1n; j < BigInt(values.length); j++) {
      const valI = values[i];
      const valJ = values[j];
      if ((BigInt(valI) + BigInt(valJ)) === target) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
