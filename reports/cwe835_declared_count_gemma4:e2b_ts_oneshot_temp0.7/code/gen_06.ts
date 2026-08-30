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

  // 1行目から整数を読み取る
  const firstLine = inputLines[0];
  const initialCount = parseInt(firstLine, 10);
  if (isNaN(initialCount)) {
    // 1行目が不正な場合は、読み取れた整数を0として扱うか、エラー処理を検討するが、仕様に従い続行
    // ここでは、読み取れた整数のみを対象とするため、最初の行が無視される可能性がある
  } else {
    count = initialCount;
  }

  // 2行目以降の行から整数を読み取る
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line === "") continue;

    const num = parseInt(line, 10);
    
    // 整数として解釈でき、かつ64bitの範囲内（JavaScriptのNumber型で十分）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      sum += num;
    }
  }

  // 実際に読み取れた整数（2行目以降の有効な数値）の個数と合計を出力する
  // 仕様: 「実際に読み取れた整数だけを対象とします」
  // 1行目の値と読み取れた個数が一致しない可能性がある。
  // ここでは、2行目以降の有効な数値の個数と合計を出力する。
  
  // 実際に入力された行数と、有効な数値の個数を区別する必要がある。
  // 1行目: 期待される個数 (initialCount)
  // 2行目以降: 実際のデータ
  
  // 読み取れた整数の個数 (count) は、2行目以降でsumに加算された回数、または、
  // 実際に読み取れた整数（2行目以降）の個数とする。
  
  // 問題文の「実際に読み取れた整数だけを対象とします」を、
  // 「1行目の値と一致しないことがある」という点と合わせて解釈する。
  // 読み取れた整数（2行目以降）の個数を count とする。

  const actualCount = inputLines.slice(1)
    .filter(line => line.length > 0)
    .map(line => parseInt(line, 10))
    .filter(n => !isNaN(n) && Number.isSafeInteger(n))
    .length;

  console.log(`count=${actualCount} sum=${sum}`);
});
