const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Set<number>();
  let sum = 0;
  for (const token of s.split(",")) {
    if (token.trim() === "") continue;
    const n = parseInt(token, 10);
    if (Number.isNaN(n)) continue;
    nums.add(n);
    sum += n;
  }
  console.log(`count=${nums.size} sum=${sum}`);
});
