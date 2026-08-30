const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0n; // 64bit整数を扱うためBigIntを使用
  let valid = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const colonIndex = trimmedPart.indexOf(':');
    if (colonIndex === -1) continue;

    const valueStr = trimmedPart.substring(0, colonIndex);
    const countStr = trimmedPart.substring(colonIndex + 1);

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      count += count;
      sum += BigInt(value) * BigInt(count);
      valid = true;
    }
  }

  if (valid) {
    console.log(`count=${count} sum=${sum.toString()}`);
  }
});
