const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0;

  for (const part of parts) {
    if (part.trim() === "") continue;
    const [valueStr, countStr] = part.split(':');
    if (!valueStr || !countStr) continue;

    const value = parseInt(valueStr.trim(), 10);
    const countNum = parseInt(countStr.trim(), 10);

    if (!isNaN(value) && !isNaN(countNum) && countNum >= 0) {
      // 要素数 (要素数 = 値 * 回数)
      const elementCount = value * countNum;
      // 合計 (合計 = 値 * 回数)
      const total = value * countNum;

      count += elementCount;
      sum += total;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
