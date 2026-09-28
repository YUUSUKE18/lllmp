let count = 0;
let sum = 0;
let lineCount = 0;

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  const lines = data.trim().split('\n').filter(line => line.length > 0);
  
  if (lineCount === 0) {
    // 1行目: 続く整数の個数
    const numCount = parseInt(lines[0], 10);
    if (!isNaN(numCount)) {
      count = numCount;
      lineCount = 1;
    } else {
      // 1行目が無効な場合、以降の入力を無視（仕様上、1行目のみを信頼して処理を継続するか、あるいは何も処理しないか。ここでは読み取った数だけを対象とするため、そのまま続行）
      // ただし、次の行から数値を読み始める必要があるため、ここではラインをそのまま処理続行とする。
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
  // 読み取れた実際の整数個数と合計を出力
  console.log(`count=${count} sum=${sum}`);
});
