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

  // 1行目を読み取り、実際に読み取れた個数を把握
  const firstLine = inputLines[0];
  const firstLineNumber = parseInt(firstLine, 10);
  
  // 2行目以降を整数として処理
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line) {
      const num = parseInt(line, 10);
      if (!isNaN(num)) {
        sum += num;
      }
    }
  }

  // 実際に読み取れた整数の個数を計算（1行目を除く）
  // 1行目以降の行をチェックし、整数として解釈できたものの個数を数える
  let actualCount = 0;
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line) {
      const num = parseInt(line, 10);
      if (!isNaN(num)) {
        actualCount++;
      }
    }
  }
  
  // 1行目の値が実際に読み取れた個数と一致しない可能性があるため、
  // 2行目以降で読み取れた整数のみを対象とする。
  // 仕様の「実際に読み取れた整数だけを対象とします」を解釈し、
  // 1行目の値は無視し、2行目以降のデータから整数を抽出する。
  
  // 再度、2行目以降のデータから整数を抽出してカウントと合計を計算する
  let finalCount = 0;
  let finalSum = 0;
  
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line) {
      const num = parseInt(line, 10);
      if (!isNaN(num)) {
        finalCount++;
        finalSum += num;
      }
    }
  }

  console.log(`count=${finalCount} sum=${finalSum}`);
});
