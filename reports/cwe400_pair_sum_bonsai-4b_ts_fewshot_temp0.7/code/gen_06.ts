const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(s.split(" ")[0]);
  let pairs = 0;
  for (let i = 1; i < s.length; i += 1) {
    const numStr = s.substring(i, i + 1).trim();
    if (!numStr || !/^-?\d+$/.test(numStr)) continue;
    const n = parseInt(numStr, 10);
    if (n === goal) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
