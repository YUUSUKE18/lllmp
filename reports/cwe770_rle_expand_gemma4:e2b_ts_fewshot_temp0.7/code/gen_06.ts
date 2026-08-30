const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0n; // 64bit整数を扱うためBigIntを使用
  const regex = /^(\d+):(\d+)$/;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (!trimmedPart) continue;

    const match = trimmedPart.match(regex);
    if (match) {
      const value = parseInt(match[1], 10);
      const countVal = parseInt(match[2], 10);

      if (!isNaN(value) && !isNaN(countVal) && countVal >= 0) {
        // 要素数 (countVal) を加算
        sum += BigInt(value) * BigInt(countVal);
        // 要素数 (countVal) を加算
        count += countVal;
      }
    }
  }

  console.log(`count=${count} sum=${sum.toString()}`);
});
