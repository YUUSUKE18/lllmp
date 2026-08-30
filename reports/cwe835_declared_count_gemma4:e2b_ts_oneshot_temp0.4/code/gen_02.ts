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
  const countStr = firstLine.split(/\s+/)[0];
  const expectedCount = parseInt(countStr, 10);

  let actualCount = 0;
  let actualSum = 0;

  // 2行目以降をチェック
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    // 空行は無視
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈できるかチェック
    if (!isNaN(num)) {
      // 64bit整数範囲内であるか（TypeScript/JavaScriptのNumber型で十分だが、念のため）
      // 課題の制約上、読み取れた整数をそのまま扱う
      actualCount++;
      actualSum += num;
    }
  }

  // 実際に読み取れた個数と合計を出力
  console.log(`count=${actualCount} sum=${actualSum}`);
});
