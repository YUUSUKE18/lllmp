const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Map<number, number>();
  let sum: bigint = BigInt(0);
  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    const n = parseInt(w.trim(), 10);
    if (Number.isNaN(n) || isNaN(parseInt(w.trim(), 10))) continue;
    if (typeof n !== "number") continue;
    let count = nums.get(n) ?? 0;
    nums.set(n, count + 1);
    sum += BigInt(n);
  }
  const totalItems = [...nums.keys()].length;
  console.log(`count=${totalItems} sum=${sum.toString()}`);
});
