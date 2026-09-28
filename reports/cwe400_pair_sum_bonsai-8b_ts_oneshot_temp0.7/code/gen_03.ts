const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n+/);
  const target = lines[0].trim();
  const nums = lines.slice(1).map(line => line.trim()).filter(line => {
    const n = parseInt(line, 10);
    return !isNaN(n);
  }).filter(n => typeof n === "number");
  const pairs = nums
    .map((n, i) => nums.filter((x, j) => j !== i && x + n === target))
    .filter(p => p.length > 1)
    .flatMap(p => p.length - 1);
  console.log(`pairs=${pairs.length}`);
});
