const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0n; // 64bit整数として扱うためBigIntを使用

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const colonIndex = trimmedPart.indexOf(':');
    if (colonIndex === -1) continue;

    const valueStr = trimmedPart.substring(0, colonIndex);
    const countStr = trimmedPart.substring(colonIndex + 1);

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    if (!Number.isNaN(value) && !Number.isNaN(count) && count >= 0) {
      // 値:回数 の形式で解釈できた場合、値が 'value' で、回数が 'count' であると解釈する。
      // 仕様の例「7:3,2:2 は 7,7,7,2,2 という整数列を表します」に基づき、
      // 値:回数 の形式で、値が count 回繰り返されると解釈する。
      for (let i = 0; i < count; i++) {
        sum += BigInt(value);
      }
      count += count;
    }
  }

  console.log(`count=${count} sum=${sum.toString()}`);
});
