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
  const firstLineNumber = parseInt(firstLine, 10);

  // 2行目以降を整数として処理
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈でき、かつ64bit範囲内か確認（ここではNumber型で十分だが、仕様に合わせる）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      sum += num;
    }
  }

  // 実際に読み取れた個数と合計を出力
  console.log(`count=${count} sum=${sum}`);
});
