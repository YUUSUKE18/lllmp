const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = parseInt(process.stdin.readline().trim());
  let pairs = 0;
  for (let i = 1; i < s.length; i += 1) {
    const numStr = s.substring(i, i + 10);
    const num = parseInt(numStr, 10);
    if (isNaN(num)) continue;
    if (num === target) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
