let count = 0;
let sum = 0;
let inputLines: string[] = [];

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  inputLines.push(data.trim());
});

process.stdin.on("end", () => {
  if (inputLines.length === 0) {
    console.log("count=0 sum=0");
    return;
  }

  // 1行目から個数を取得
  const firstLine = inputLines[0];
  const numCount = parseInt(firstLine, 10);

  let actualCount = 0;
  let actualSum = 0;

  // 2行目以降をチェック
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈できるかチェック
    if (!isNaN(num)) {
      // 実際に読み取れた整数だけを対象とする
      actualCount++;
      actualSum += num;
    }
  }

  // 実際に読み取れた個数と合計を出力
  console.log(`count=${actualCount} sum=${actualSum}`);
});
