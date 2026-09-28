const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split(/\r?\n/);

  for (const line of lines) {
    if (line.trim() === "") continue;
    
    // 前後の空白を除去して処理
    const trimmedLine = line.trim();
    
    let parts = [];
    // カンマで分割し、空文字列を含めないようにフィルタリング（末尾カンマの場合など）
    const splitParts = trimmedLine.split(',').map(p => p.trim());
    
    // 各要素が整数かどうかチェック
    for (const part of splitParts) {
      if (!/^-?\d+$/.test(part)) {
        break; // 無効な数字が見つかったら破棄
      }
      parts.push(parseInt(part, 10));
    }
    
    // 有効かどうかの判定
    // 条件: 1 個以上の数字列がカンマで区切られて並んでいること。
    // つまり、分割後の要素リストが空でないこと。
    if (parts.length > 0) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
