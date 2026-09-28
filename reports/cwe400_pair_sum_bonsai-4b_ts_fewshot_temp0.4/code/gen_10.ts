const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = parseInt(process.stdin.read().toString("utf8"), 10);
  let pairs = 0;
  let lines = 0;
  for (let i = 0; i < s.length; i += 1) {
    const ch = s[i];
    if (ch === "\n") lines++;
    if (ch === " ") continue;
    const n = parseInt(ch.toString(), 10);
    if (n === undefined || n < 0 || n > target) continue;
    if (i + 1 < s.length && s[i + 1] === " " || s[i + 1] === "\n") continue;
    if (n === target) {
      pairs++;
    }
  }
  console.log(`pairs=${pairs}`);
});
