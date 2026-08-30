const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0n; // 64bit整数として扱うためBigIntを使用
  let isValid = true;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const colonIndex = trimmedPart.indexOf(':');
    if (colonIndex === -1) {
      isValid = false;
      break;
    }

    const valueStr = trimmedPart.substring(0, colonIndex);
    const countStr = trimmedPart.substring(colonIndex + 1);

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    if (!Number.isNaN(value) && !Number.isNaN(count) && count >= 0) {
      // 要素数と合計を計算
      const num = BigInt(value);
      const numCount = BigInt(count);

      sum += num * numCount;
      count += count;
    } else {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    console.log(`count=${count} sum=${sum.toString()}`);
  }
});
