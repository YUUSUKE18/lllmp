process.stdin.on("data", (data: Buffer) => {
  const line = data.toString().trim();
  if (line.length === 0) {
    // 空行は妥当ではない
    return;
  }

  // カンマ区切りの整数列として解析を試みる
  // 末尾のカンマは許容する
  let isValid = true;
  let parts = line.split(',');

  if (parts.length === 0) {
    isValid = false;
  } else {
    // 各部分が整数（または空文字列）であるか確認
    for (const part of parts) {
      if (part.length > 0) {
        // 数字のみで構成されているか確認
        if (!/^\d+$/.test(part)) {
          isValid = false;
          break;
        }
      }
    }
  }

  // 妥当な行数のみをカウントする
  if (isValid) {
    // 1個以上の数字列がカンマで区切られて並んでいる必要がある
    // 末尾のカンマがあっても、実質的に数字列が存在すればOKとする。
    // 例: "1,2," -> ["1", "2", ""] -> 2個の数字列が存在
    const actualNumbers = parts.filter(p => p.length > 0);
    if (actualNumbers.length >= 1) {
      // 妥当
    } else {
      isValid = false;
    }
  }


  // 最終的な結果を格納する配列
  const results: string[] = [];
  let validCount = 0;

  // 標準入力全体を読み込むために、ここでは一行ずつ処理するのではなく、
  // 標準入力ストリーム全体を処理するロジックに切り替える必要がある。
  // しかし、指定された形式（標準入力の各行が...）に従うため、
  // ストリーム全体を処理し、各行を区切る必要がある。

  // 標準入力全体をバッファリングし、行ごとに処理する
  let inputData = "";
  process.stdin.on("data", (data: Buffer) => {
    inputData += data.toString();
  });

  process.stdin.on("end", () => {
    const lines = inputData.split(/\r?\n/).map(line => line.trim());
    let finalValidCount = 0;

    for (const line of lines) {
      if (line.length === 0) {
        continue; // 空行はスキップ
      }

      const parts = line.split(',');
      let isLineValid = true;
      let hasNumbers = false;

      for (const part of parts) {
        if (part.length > 0) {
          // 数字のみで構成されているか確認
          if (!/^\d+$/.test(part)) {
            isLineValid = false;
            break;
          }
          hasNumbers = true;
        }
      }

      // 1個以上の数字列がカンマで区切られて並んでいる必要がある
      if (isLineValid && hasNumbers) {
        finalValidCount++;
      }
    }

    console.log(`valid=${finalValidCount}`);
  });
});
