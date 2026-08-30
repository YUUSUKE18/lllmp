const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").trim();
  if (s.length === 0) {
    console.log("count=0 sum=0");
    return;
  }

  const parts = s.split(',');
  let totalCount = 0n;
  let totalSum = 0n;

  for (const part of parts) {
    if (part.length === 0) continue;

    const colonIndex = part.indexOf(':');
    if (colonIndex === -1) continue;

    const valueStr = part.substring(0, colonIndex).trim();
    const countStr = part.substring(colonIndex + 1).trim();

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      // 値:回数 を N回繰り返す = N * 値 の合計
      totalCount += BigInt(count);
      totalSum += BigInt(count) * BigInt(value);
    }
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});
