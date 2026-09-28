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
    if (ch === "\n") {
      current += 1;
      if (current > 2) {
        pairs += Math.floor(current / 2);
        current = 0;
      }
    } else if (ch === " ") continue;
    const n = parseInt(ch, 10);
    if (n === target) {
      current += 1;
    } else if (n !== target && current > 0) {
      current = 0;
    }
  }
  console.log(`pairs=${pairs}`);
});
