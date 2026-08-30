const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;

  const parts = s.split(',');

  for (const part of parts) {
    if (part.trim() === "") continue;

    const [valueStr, countStr] = part.split(':');

    if (valueStr && countStr) {
      const value = parseInt(valueStr.trim(), 10);
      const count = parseInt(countStr.trim(), 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        // 要素数と合計は64bit整数で管理
        const num = BigInt(value);
        const numCount = BigInt(count);

        // 要素数 (count) の計算
        count += numCount;

        // 合計 (sum) の計算: value * count
        sum += num * numCount;
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
