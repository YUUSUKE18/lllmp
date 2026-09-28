const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0n; // 合計は64bit整数に収まるためBigIntを使用
  let isValid = true;

  for (const part of parts) {
    if (part.trim() === "") continue;

    const [valueStr, countStr] = part.split(':');
    if (!valueStr || !countStr) continue;

    const value = parseInt(valueStr.trim(), 10);
    const countNum = parseInt(countStr.trim(), 10);

    if (!isNaN(value) && !isNaN(countNum) && countNum >= 0) {
      count += countNum;
      sum += BigInt(value) * BigInt(countNum);
    } else {
      // 値または回数が整数としてパースできなかった場合は無視
      isValid = false;
    }
  }

  if (isValid) {
    console.log(`count=${count} sum=${sum.toString()}`);
  }
});
