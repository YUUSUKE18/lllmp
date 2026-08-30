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

  // 1行目を読み取り、整数として解析
  const firstLine = inputLines[0];
  const initialCount = parseInt(firstLine, 10);

  let actualCount = 0;
  let actualSum = 0;

  // 2行目以降を処理
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈でき、かつ64bit範囲内（ここでは数値として扱える範囲）であるかを確認
    if (!isNaN(num)) {
      // 実際に読み取れた整数のみを対象とする
      actualCount++;
      actualSum += num;
    }
  }

  // 実際に読み取れた整数だけを対象とする
  console.log(`count=${actualCount} sum=${actualSum}`);
});
