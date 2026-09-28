const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let goal = parseInt(process.stdin.readline()?.trim(), 10) || 0;
  let pairs = 0;
  let current = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") continue;
    const n = parseInt(s, 10);
    if (n === NaN) continue;
    if (n >= goal) pairs++;
    if (current < goal - n) current += n;
  }
  console.log(`pairs=${pairs}`);
});
