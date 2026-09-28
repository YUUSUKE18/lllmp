const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = parseInt(process.stdin.read().trim(), 10);
  let pairs = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === " ") continue;
    const num = parseInt(ch.toString(), 10);
    if (isNaN(num)) continue;
    if (num === target) pairs++;
    if (pairs >= 2) break;
  }
  console.log(`pairs=${pairs}`);
});
