process.stdin.setEncoding("utf8");
let validCount = 0;
let inputData = "";

process.stdin.on("data", (data: string) => {
  inputData += data;
});

process.stdin.on("end", () => {
  const lines = inputData.split("\n");
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) {
      continue;
    }

    // 末尾のカンマを無視して、カンマ区切りの整数列としてパースを試みる
    // 正規表現: 数字の羅列とカンマの組み合わせをチェック
    // 許容される形式: 1,2,3, または 1,2,3, など
    // 末尾のカンマは許容される
    const isValidFormat = /^\s*(\d+(,\d+)*)\s*$/.test(line);

    if (isValidFormat) {
      // より厳密なチェック: カンマ区切りの整数列のみ
      const parts = line.split(',');
      let allAreIntegers = true;
      for (const part of parts) {
        if (part.trim() === "") {
          // 空の要素は、末尾のカンマが許容される場合（例: "1,2,"）に発生する可能性がある
          // ただし、この仕様では「1個以上の数字列がカンマで区切られて並んでいること」が重要。
          // 空の要素が連続する場合は妥当ではない可能性がある。
          continue;
        }
        if (!/^\d+$/.test(part)) {
          allAreIntegers = false;
          break;
        }
      }
      
      if (allAreIntegers) {
        validCount++;
      }
    }
  }

  console.log(`valid=${validCount}`);
});
