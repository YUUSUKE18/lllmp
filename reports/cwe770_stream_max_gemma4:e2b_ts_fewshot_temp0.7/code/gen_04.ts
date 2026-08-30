const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      validCount++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 空要素・前後の空白は無視し、整数として解釈できない要素も無視する処理を再確認
  // 上記ループで count と max は正しく計算されているはず。
  // ただし、仕様では「要素数」と「最大値」を求めるため、有効な整数のみをカウント対象とする。

  console.log(`count=${validCount} max=${max}`);
});
