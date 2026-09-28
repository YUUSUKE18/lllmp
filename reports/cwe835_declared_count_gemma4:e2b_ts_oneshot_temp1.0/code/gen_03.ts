let count = 0;
let sum = 0;
let lines: string[] = [];

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  lines.push(data.trim());
});

process.stdin.on("end", () => {
  if (lines.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  // 1行目が個数
  const firstLine = lines[0];
  const initialCount = parseInt(firstLine, 10);

  if (isNaN(initialCount)) {
    // 1行目が不正な場合、読み取れた整数のみを処理対象とする（この仕様では1行目が個数なので、ここでは読み取れた整数のみを処理する）
    // 厳密には「実際に読み取れた整数だけを対象とします」という指示に従うため、
    // 2行目以降のデータのみを整数として試行する。
  }

  // 2行目以降の行を処理
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈できたかチェック
    if (!isNaN(num)) {
      // 実際に読み取れた整数だけを対象とする
      count++;
      sum += num;
    }
  }

  // 実際に読み取れた個数と合計を出力
  console.log(`count=${count} sum=${sum}`);
});
