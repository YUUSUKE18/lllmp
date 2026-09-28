const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = parseInt(process.stdin.read().trim());
  let pairs = 0;
  let current = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === " ") continue;
    if (ch === "\n") {
      current++;
      if (current > 0 && current === 1) {
        pairs++;
        current = 0;
      }
    } else if (ch === " ") continue;
    const n = parseInt(ch, 10);
    if (n !== undefined && n !== 0) {
      current += 1;
      if (current >= 2) {
        if (n === target || n === target + target) {
          pairs++;
        }
      }
    }
  }
  console.log(`pairs=${pairs}`);
});
