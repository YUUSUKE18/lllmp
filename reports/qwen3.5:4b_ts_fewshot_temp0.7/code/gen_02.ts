const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);
  const parts = s.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length === 0) continue;
    const num = parseInt(trimmed, 10);
    if (Number.isNaN(num)) continue;
    sum += BigInt(num);
    count.set(num, (count.get(num) || 0) + 1);
  }
  let uniqueCount = count.size;
  let totalSum = Number(sum);
  console.log(`count=${uniqueCount} sum=${totalSum}`);
});
