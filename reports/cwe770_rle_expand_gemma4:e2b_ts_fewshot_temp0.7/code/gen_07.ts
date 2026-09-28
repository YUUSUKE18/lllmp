const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0;

  // カンマで区切って各要素を処理
  const parts = s.split(',');

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const separatorIndex = trimmedPart.indexOf(':');
    if (separatorIndex === -1) continue;

    const valueStr = trimmedPart.substring(0, separatorIndex);
    const countStr = trimmedPart.substring(separatorIndex + 1);

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    // 値と回数が有効な整数であり、回数が0以上であるか確認
    if (!Number.isNaN(value) && !Number.isNaN(count) && count >= 0) {
      // この値が指定された回数だけ繰り返されると解釈
      sum += value * count;
      count += count; // 要素数の加算
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
