const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Set<number>();
  let sum = 0n;
  for (const token of s.split(",")) {
    if (token.trim() === "") continue;
    const n = parseInt(token, 10);
    if (Number.isNaN(n)) continue;
    if (!nums.has(n)) {
      nums.add(n);
    } else {
      sum += BigInt(n);
    }
  }
  console.log(`count=${nums.size} sum=${sum}`);
});
