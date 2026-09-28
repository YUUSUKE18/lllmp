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

    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      // 値:回数 の形式で、値が繰り返されると解釈する
      for (let i = 0; i < count; i++) {
        sum += BigInt(value);
      }
      count += count;
    } else {
      // 値:回数 の形式に解釈できない要素は無視
      isValid = false;
      break;
    }
  }

  if (isValid) {
    console.log(`count=${count} sum=${sum.toString()}`);
  }
});
