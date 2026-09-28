const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Map<number, number>();
  let sum = BigInt(0);

  for (const f of s.split(",")) {
    const trimmed = f.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n) || !Number.isInteger(n)) continue;

    if (!nums.has(n)) {
      nums.set(n, 1n);
      sum += BigInt(n);
    } else {
      nums.set(n, nums.get(n)! + 1n);
    }
  }

  let count = 0n;
  for (const val of nums.values()) {
    count += val;
  }

  console.log(`count=${count} sum=${sum}`);
});
