const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let pairs = 0;
  for (let i = 1; i < s.split("\n").length; i++) {
    const n = parseInt(s.split("\n")[i], 10);
    if (Number.isNaN(n)) continue;
    if (n + s.split("\n")[i + 1] === target) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
