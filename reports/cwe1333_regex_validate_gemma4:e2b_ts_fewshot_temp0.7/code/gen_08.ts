const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines: string[] = s.split('\n');
  let validLines = 0;

  for (const line of lines) {
    // 行の前後の空白を無視
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 妥当性の判定：カンマ区切りの整数列が1個以上存在し、数字とカンマ以外を含まない
    
    // 1. 数字とカンマ以外を含まないかチェック
    let isValidFormat = true;
    for (const char of trimmedLine) {
      if (!/\d|-,\s/.test(char)) {
        isValidFormat = false;
        break;
      }
    }
    if (!isValidFormat) {
      continue;
    }

    // 2. カンマ区切りの整数列が1個以上存在するかチェック
    // 末尾のカンマは許容される
    const parts = trimmedLine.split(',');
    
    // 末尾のカンマがある場合、最後の要素が空文字列になる
    let actualParts = parts;
    if (trimmedLine.endsWith(',')) {
        actualParts.push('');
    }


    let hasNumber = false;
    for (const part of actualParts) {
        // 空文字列（カンマが連続した場合など）を除外して数字があるか確認
        if (part.trim() !== "") {
            const numStr = part.trim();
            if (!isNaN(parseInt(numStr, 10)) && numStr.length > 0) {
                hasNumber = true;
            }
        }
    }

    if (hasNumber) {
        validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
