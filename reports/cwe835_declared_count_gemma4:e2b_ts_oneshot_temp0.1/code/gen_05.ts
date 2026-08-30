let count = 0;
let sum = 0;
let lineCount = 0;

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  const lines = data.trim().split('\n').filter(line => line.length > 0);

  if (lineCount === 0) {
    // 1行目: 続く整数の個数
    const num = parseInt(lines[0], 10);
    if (!isNaN(num)) {
      count = num;
      lineCount = 1;
    } else {
      // 1行目が不正な場合は処理を終了（または無視）
      return;
    }
  } else {
    // 2行目以降: 整数
    const num = parseInt(lines[lineCount - 1], 10);
    if (!isNaN(num)) {
      sum += num;
    }
    lineCount++;
  }
});

process.stdin.on("end", () => {
  // 読み取れた整数が0個の場合、count=0 sum=0 を出力
  console.log(`count=${count} sum=${sum}`);
});
