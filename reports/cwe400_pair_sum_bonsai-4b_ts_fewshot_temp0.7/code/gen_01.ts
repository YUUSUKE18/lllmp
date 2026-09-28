const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(data[0]);
  let pairs = 0;
  let seen = new Set<number>();
  const lines = 0;
  for (let i = 1; i < data.length; i++) {
    const line = data[i].toString("utf8");
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    if (seen.has(n - goal) || seen.has(n + goal)) {
      pairs++;
      seen.add(n);
      seen.add(n + goal);
    }
    seen.add(n);
  }
  console.log(`pairs=${pairs}`);
});
