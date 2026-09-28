const data = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(process.stdin.readFileSync(0).toString("utf8"));
  let pairs = 0;
  const nums = s.split(/\s+/).filter(f => f.trim() !== "");
  const validNums = nums.filter(n => !isNaN(n) && n !== "");
  const pairsMap = new Map();
  for (const n of validNums) {
    const val = parseInt(n);
    if (val >= target) pairsMap.set(val, (pairsMap.get(val) || 0) + 1);
  }
  for (const val in pairsMap) {
    if (pairsMap.get(val) >= 2) {
      pairs += pairsMap.get(val) / 2;
    }
  }
  console.log(`pairs=${pairs}`);
});
