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
    // 1行目が数値でない場合は、読み取れた整数を0として扱うか、エラー処理が必要だが、
    // 仕様に従い、実際に読み取れた整数のみを対象とするため、ここでは0として扱うか、
    // 読み取れた整数が0個になることを想定する。
    // ただし、仕様では「実際に読み取れた整数だけを対象」とあるため、
    // 1行目の値が無視され、続く行を対象とするのが自然。
    // ここでは、1行目の値が読み取れた個数として扱われることを前提とする。
  }

  // 2行目以降を整数として処理
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line === "") continue;

    const num = parseInt(line, 10);

    if (!isNaN(num)) {
      count++;
      sum += num;
    }
  }

  // 実際に読み取れた個数と合計を出力
  console.log(`count=${count} sum=${sum}`);
});
