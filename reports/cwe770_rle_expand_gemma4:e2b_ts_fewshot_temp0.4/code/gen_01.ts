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

    if (valueStr && countStr) {
      const value = parseInt(valueStr, 10);
      const count = parseInt(countStr, 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        // 要素数 (count) を加算
        count += count;
        // 合計 (value * count) を加算
        sum += value * count;
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
