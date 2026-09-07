let target: number = parseInt(process.argv[2], 10);
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let pairs = 0;
  let prevNum: number | null = null;
  for (const numStr of s.split(/\s+/)) {
    if (numStr.trim() === "") continue;
    const num = parseInt(numStr, 10);
    if (Number.isNaN(num)) continue;
    if (prevNum !== null) {
      if (prevNum + num === target) {
        pairs++;
      }
    }
    prevNum = num;
  }
  console.log(`pairs=${pairs}`);
});
