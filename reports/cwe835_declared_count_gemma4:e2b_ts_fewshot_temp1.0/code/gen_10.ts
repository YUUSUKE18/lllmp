const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split('\n');

  if (lines.length === 0) {
    console.log("count=0 sum=0");
    return;
  }

  // 1行目の値を取得（実際に読み取れた整数個数）
  const expectedCount = parseInt(lines[0].trim(), 10);

  let actualCount = 0;
  let sum = 0;

  // 2行目以降をチェック
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈でき、かつ有効な数値（64bit範囲内）であるかを確認
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      actualCount++;
      sum += num;
    }
  }

  // 実際に読み取れた個数と合計を出力
  console.log(`count=${actualCount} sum=${sum}`);
});
