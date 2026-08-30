const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines: string[] = s.split('\n');
  let validLines = 0;

  for (const line of lines) {
    // 行の前後の空白を無視して判定
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // カンマ区切りの整数列として妥当か判定
    // 1. 数字とカンマのみで構成されているか
    // 2. 1個以上の数字列が存在するか (末尾のカンマは許容)

    // 末尾のカンマを取り除いた後の文字列をチェック
    let effectiveLine = trimmedLine;
    if (effectiveLine.endsWith(',')) {
      effectiveLine = effectiveLine.slice(0, -1);
    }

    // カンマで分割して、すべてが整数であるかを確認する
    const parts = effectiveLine.split(',');

    if (parts.length === 0) {
      // 空行やカンマのみの場合（例: "," または ""）は妥当ではない
      continue;
    }

    let allAreIntegers = true;
    for (const part of parts) {
      if (part.trim() === "") {
        // カンマが連続している場合 (例: "1,,2" や ",1") は不正とする
        // ただし、split(',')の挙動を考慮すると、もし元の行が "1,," なら parts は ["1", "", ""] となる。
        // ここでは、各要素が数字のみで構成されているかを確認する。
        continue; // 空の要素は無視する（後述の判定でカバーされる）
      }
      
      // 数字としてパース可能かチェック
      if (!/^\d+$/.test(part)) {
        allAreIntegers = false;
        break;
      }
    }

    if (allAreIntegers) {
      // 1個以上の数字列がカンマで区切られて並んでいるか (parts.length >= 1)
      // ただし、元の行が "1,2,3," のような形式であれば、有効な数字の数と区切りの有無をチェックする。
      
      // 厳密には、元の行がカンマで区切られた整数列で構成されているかを確認する。
      // 1. カンマで分割した結果、数字のみの要素が1つ以上あるか。
      // 2. 空白や数字とカンマ以外の文字が含まれていないか。
      
      // 再度、元の行全体をチェックし、数字とカンマ以外がないかを確認する
      let hasOnlyDigitsAndCommas = true;
      for (const char of line) {
        if (!/\d|,/.test(char)) {
          hasOnlyDigitsAndCommas = false;
          break;
        }
      }

      if (hasOnlyDigitsAndCommas) {
        // 末尾のカンマは許容されるため、空でない要素が存在すれば妥当とする。
        // 例: "1,2," -> parts=["1", "2", ""]. 有効な要素は2つ。
        const actualNumbers = parts.filter(p => p.trim() !== "");
        if (actualNumbers.length > 0) {
          validLines++;
        }
      }
    }
  }

  console.log(`valid=${validLines}`);
});
