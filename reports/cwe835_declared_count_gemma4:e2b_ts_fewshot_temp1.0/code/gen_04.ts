const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split('\n');
  
  if (lines.length === 0) {
    console.log("count=0 sum=0");
    return;
  }

  let actualCount = 0;
  let totalSum = 0;

  // 1行目（期待される整数個数）を読み飛ばす
  // 2行目以降の行を整数として処理する
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const num = parseInt(line, 10);
    
    // 整数として解釈できるかチェック
    if (!isNaN(num)) {
      // 64bit整数範囲内か確認（ここではJSのNumber型で扱える範囲内としてチェック。
      // 問題文の制約に従い、読み取れた整数のみを対象とする）
      actualCount++;
      totalSum += num;
    }
  }

  console.log(`count=${actualCount} sum=${totalSum}`);
});
