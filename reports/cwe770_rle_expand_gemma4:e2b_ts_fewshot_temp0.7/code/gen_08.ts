const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let sum = 0n; // 64bit整数として扱うためBigIntを使用
  let isValid = true;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const colonIndex = trimmedPart.indexOf(":");
    if (colonIndex === -1) {
      isValid = false;
      break;
    }

    const valueStr = trimmedPart.substring(0, colonIndex);
    const countStr = trimmedPart.substring(colonIndex + 1);

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    if (!Number.isNaN(value) && !Number.isNaN(count) && count >= 0) {
      // 値:回数 の形式で、値が繰り返されると解釈する。
      // 例: 7:3 は 7 が 3 回繰り返される (7, 7, 7)
      for (let i = 0; i < count; i++) {
        sum += BigInt(value);
      }
      count += count; // 要素数を加算
    } else {
      // 形式が不正な場合は無視する（仕様に従い）
      isValid = false;
      break;
    }
  }

  if (isValid) {
    console.log(`count=${count} sum=${sum.toString()}`);
  }
});
