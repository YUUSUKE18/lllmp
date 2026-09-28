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

    // 整数として解釈できるか確認し、64bit範囲内か確認（ここでは単純にNaNチェックと数値としての扱いを重視）
    if (!Number.isNaN(num)) {
      validCount++;
      // 最大値を更新
      if (num > max) {
        max = num;
      }
    }
  }

  // 処理した要素数（有効な整数のみ）と最大値を結果として出力
  console.log(`count=${validCount} max=${max}`);
});
