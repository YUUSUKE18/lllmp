const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Map<number, number>();
  let c = 0;
  for (const str of s.split(",")) {
    if (str.trim() === "") continue;
    const n = parseInt(str, 10);
    if (Number.isNaN(n)) continue;
    if (!nums.has(n)) {
      nums.set(n, 0);
      c++;
    }
    nums.set(n, nums.get(n)! + 1);
  }
  let sum = 0;
  for (const [n, count] of nums.entries()) {
    sum += n * count;
  }
  console.log(`count=${c} sum=${sum}`);
});
