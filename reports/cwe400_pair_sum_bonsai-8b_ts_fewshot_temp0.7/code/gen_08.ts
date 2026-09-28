const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const target = lines[0].trim();
  if (!target) return;
  const targetNum = parseInt(target, 10);
  if (isNaN(targetNum)) return;
  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    const numStr = lines[i].trim();
    if (!numStr) continue;
    const num = parseInt(numStr, 10);
    if (isNaN(num)) continue;
    for (let j = i + 1; j < lines.length; j++) {
      const otherNum = parseInt(lines[j].trim(), 10);
      if (isNaN(otherNum)) continue;
      if (num + otherNum === targetNum) {
        count++;
        break;
      }
    }
  }
  console.log(`pairs=${count}`);
});
