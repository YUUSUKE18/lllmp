const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.trim(), 10);
  let pairs = 0;
  let seen = new Set<number>();
  for (const line of s.split("\n").slice(1)) {
    const num = parseInt(line.trim(), 10);
    if (Number.isNaN(num)) continue;
    if (seen.has(target - num)) pairs++;
    seen.add(num);
  }
  console.log(`pairs=${pairs}`);
});
