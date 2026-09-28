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

  if (isNaN(firstLineNumber)) {
    // 1行目が不正な場合は、読み取れた整数を0として扱うか、仕様に従う。
    // ここでは、1行目の値が個数として使われることを前提とし、もしそれが不正なら0個として扱う。
    // ただし、仕様では「実際に読み取れた整数だけを対象」とあるため、1行目の値が個数として使われる。
    // 読み取れた整数が0個の場合、sumは0。
    console.log(`count=0 sum=0`);
    return;
  }

  count = firstLineNumber;
  sum = 0;
  let actualCount = 0;

  // 2行目以降を整数として処理
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line === "") continue;

    const num = parseInt(line, 10);

    if (!isNaN(num)) {
      // 実際に読み取れた整数のみを対象とする
      sum += num;
      actualCount++;
    }
  }

  // 実際に読み取れた個数と合計を出力
  console.log(`count=${actualCount} sum=${sum}`);
});
