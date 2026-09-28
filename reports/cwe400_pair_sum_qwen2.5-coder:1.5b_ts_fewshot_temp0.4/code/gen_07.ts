const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let pairs = 0;
  let currentSum = 0;
  for (const line of s.split("\n").slice(1)) {
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    currentSum += n;
    if (currentSum >= target) {
      pairs += Math.floor((currentSum - target) / n);
      currentSum -= n;
    }
  }
  console.log(`pairs=${pairs}`);
});
