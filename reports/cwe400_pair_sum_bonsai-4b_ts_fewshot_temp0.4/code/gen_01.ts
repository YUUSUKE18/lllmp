const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = parseInt(process.stdin.read().trim(), 10);
  let pairs = 0;
  let current = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === " ") continue;
    const n = parseInt(ch, 10);
    if (n === NaN) continue;
    if (n > target) {
      pairs++;
      current = 0;
    }
  }
  console.log(`pairs=${pairs}`);
});
