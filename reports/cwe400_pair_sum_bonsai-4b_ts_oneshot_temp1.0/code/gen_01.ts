const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = s.split(/\s+/)[0].trim() === "" ? 0 : parseInt(s.split(/\s+/)[0], 10);
  let count = 0, pairs = 0;
  const values = s.split(/\s+/).filter(v => v.trim() !== "");
  for (const v of values) {
    const n = parseInt(v, 10);
    if (isNaN(n)) continue;
    if (n === goal) {
      count++;
      if (count > 1) pairs++;
    }
  }
  console.log(`pairs=${pairs}`);
});
