const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let n = 0, sum = 0n;
  let lines = s.split("\n");
  for (const line of lines) {
    if (!line.trim()) continue;
    if (n === 0) {
      n = parseInt(line, 10);
      if (!Number.isNaN(n)) break;
      continue;
    }
    const p = parseInt(line, 10);
    if (Number.isNaN(p)) continue;
    sum += BigInt(p);
    n++;
  }
  console.log(`count=${n} sum=${sum}`);
});
