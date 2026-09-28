const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  let lines = 0;
  let sum = 0;
  let count = 0;
  const linesArray = data.toString("utf8").trim().split('\n');

  if (linesArray.length > 0) {
    // 1行目から個数を取得（無視するが、読み取り処理として扱う）
    const firstLine = linesArray[0].trim();
    if (firstLine) {
      // 1行目の値は読み取れた整数個数として扱う（ただし、実際の読み取り結果と異なる場合があるため、ここでは無視して以降の行を処理する）
      // 仕様に基づき、1行目を読み取った後の行を対象とする
    }

    // 2行目以降を整数として処理
    for (let i = 1; i < linesArray.length; i++) {
      const line = linesArray[i].trim();
      if (line) {
        const num = parseInt(line, 10);
        if (!isNaN(num)) {
          sum += num;
          count++;
        }
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
