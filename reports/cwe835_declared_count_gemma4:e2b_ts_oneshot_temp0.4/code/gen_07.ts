let count = 0;
let sum = 0;
let inputLines: string[] = [];

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  inputLines.push(data.trim());
});

process.stdin.on("end", () => {
  if (inputLines.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  // 1行目から個数を取得
  const firstLine = inputLines[0];
  const firstLineNumber = parseInt(firstLine, 10);

  if (isNaN(firstLineNumber)) {
    // 1行目が不正な場合は、読み取れた整数を0として扱う（またはエラー処理だが、ここでは仕様に従い続行）
    // ただし、仕様では「実際に読み取れた整数だけ」を対象とするため、1行目以降をチェックする。
  }

  let actualCount = 0;
  let actualSum = 0;

  // 2行目以降をチェック
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line === "") continue;

    const num = parseInt(line, 10);

    if (!isNaN(num)) {
      actualCount++;
      actualSum += num;
    }
  }

  // 厳密に `count=<実際に読み取れた個数> sum=<合計>` という 1 行だけを出力
  console.log(`count=${actualCount} sum=${actualSum}`);
});
