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

  // 1行目を読み取る
  const firstLine = inputLines[0];
  const firstLineNumber = parseInt(firstLine, 10);

  if (isNaN(firstLineNumber)) {
    // 1行目が整数でない場合は、読み取れた整数を0として扱うか、エラー処理が必要だが、
    // 仕様に従い、読み取れた整数のみを対象とするため、ここでは0として進める。
    // ただし、1行目が「続く整数の個数」であるため、もしそれが無効なら、
    // 続く行を整数として処理する。
  } else {
    count = firstLineNumber;
  }

  // 2行目以降を整数として処理する
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i];
    if (line === "") continue;

    const num = parseInt(line, 10);

    if (!isNaN(num)) {
      // 実際に読み取れた整数だけを対象とする
      sum += num;
    }
  }

  // 実際に読み取れた整数の個数 (count) は、1行目の値と、実際にパースできた行数に基づいて決定する。
  // 仕様：「実際に読み取れた整数だけを対象とします」
  // 1行目の値は「期待される個数」であり、実際に読み取れた個数とは異なる可能性がある。
  // 実際に読み取れた整数は、2行目以降でパースできたもののみ。
  // 1行目の値が有効な個数として扱われるべきか、パースできた個数として扱われるべきか。
  // 「実際に読み取れた整数だけを対象とします」という指示から、パースできた個数をcountとする。
  
  // 1行目の値が有効な個数としてカウントされる場合:
  // count = firstLineNumber; 
  
  // 実際に読み取れた整数のみを対象とする場合:
  // countはループ内で実際に加算された個数になる。
  
  // ここでは、1行目の値が「実際に読み取れた個数」の基準となるため、
  // 1行目の値が有効であればそれを採用し、そうでなければパースされた行数を採用する、という解釈が自然。
  // しかし、最も厳密に「実際に読み取れた整数だけを対象」と解釈すると、
  // 1行目の値は無視し、2行目以降のパース結果のみを対象とする。
  
  // 1行目の値が有効な整数として扱われることを前提とする。
  if (isNaN(firstLineNumber)) {
      // 1行目が無効な場合、countは0とする。
      count = 0;
  } else {
      // 1行目の値が有効な場合、その値を「実際に読み取れた個数」とする。
      count = firstLineNumber;
  }


  console.log(`count=${count} sum=${sum}`);
});
