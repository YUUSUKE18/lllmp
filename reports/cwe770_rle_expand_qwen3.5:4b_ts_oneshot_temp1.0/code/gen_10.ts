const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let totalCount = 0;
  let totalCountValue = 0n;

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    if (!/^\d+:\d+$/.test(trimmed)) continue;

    const arr = trimmed.split(":");
    const val = parseInt(arr[0], 10);
    const count = parseInt(arr[1], 10);

    if (val !== undefined && !Number.isNaN(val) && count >= 0) {
      totalCountValue += BigInt(val) * BigInt(count);
      totalCount += count;
    }
  }

  console.log(`count=${totalCount} sum=${totalCountValue}`);
});
