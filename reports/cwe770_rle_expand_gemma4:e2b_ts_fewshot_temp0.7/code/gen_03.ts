const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0;

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
      // 値:回数 の形式が正しく成立しているか確認
      // 仕様上、値:回数 の形式で入力されることを前提とする。
      // 例: 7:3,2:2 -> 7,7,7,2,2
      for (let i = 0; i < count; i++) {
        sum += value;
      }
      count += count;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
