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
      current++;
      if (current >= 2) {
        pairs += Math.min(current - 1, 1);
        current = 0;
      }
    } else if (ch === " ") {
      current = 0;
    } else if (ch >= "0" && ch <= "9") {
      current = current * 10 + (ch - "0");
      if (current === target) {
        pairs++;
      }
    }
  }
  console.log(`pairs=${pairs}`);
});
