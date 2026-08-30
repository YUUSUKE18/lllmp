const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const input = Buffer.concat(data).toString("utf8");
  const lines = input.split(/\r?\n/).filter(line => line.trim() !== "");
  let validCount = 0;

  for (const line of lines) {
    // 末尾のカンマを考慮しつつ、カンマ区切りの整数列をチェックする
    // 妥当なパターン: 1個以上の数字とカンマのみで構成され、数字列が区切られている
    // 末尾のカンマは許容される。
    
    // 1. 空行でないこと (filterで既に処理済み)
    // 2. 数字とカンマ以外を含まないこと
    let isValid = true;
    let containsOnlyDigitsAndCommas = true;
    
    for (const char of line) {
      if (!/^[0-9,]*$/.test(char)) {
        isValid = false;
        containsOnlyDigitsAndCommas = false;
        break;
      }
    }

    if (!containsOnlyDigitsAndCommas) {
      continue; // 数字とカンマ以外を含む行はスキップ
    }
    
    // 3. 1個以上の数字列がカンマで区切られて並んでいること (末尾のカンマは許容)
    // 末尾のカンマを一旦取り除いて、カンマで分割された要素が1つ以上存在するか確認する。
    
    // 末尾のカンマを取り除く（もしあれば）
    let processedLine = line.replace(/,$/g, "");

    // カンマで分割し、空でない要素があるか確認する
    const parts = processedLine.split(",");
    
    // 1個以上の数字列がカンマで区切られて並んでいるか
    if (parts.length > 0) {
        let hasNumber = false;
        for (const part of parts) {
            // 空でない部分があれば、それが数字のみで構成されているかチェックする
            if (part.trim() !== "") {
                if (/^\d+$/.test(part.trim())) {
                    hasNumber = true;
                } else {
                    // 数字とカンマ以外が含まれている場合は無効
                    isValid = false;
                    break;
                }
            }
        }
        
        if (hasNumber) {
            validCount++;
        }
    }
    
    if (isValid) {
        // ここでisValidがtrueになった場合のみカウントを確定する
        // 上記のロジックを簡略化し、仕様に厳密に合わせるため再評価
        
        // 仕様再確認: 「1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
        // 「空行、および数字とカンマ以外を含む行は妥当ではありません。」
        
        // 以下のチェックを再実行する
        const effectiveLine = line.replace(/,$/g, ""); // 末尾のカンマを削除

        if (effectiveLine.length === 0) {
             // 行がカンマだけで構成されていた場合 (例: "," または ",," など)
             // 1個以上の数字列がなければ不適
             continue;
        }
        
        const effectiveParts = effectiveLine.split(',');
        
        let validPartsCount = 0;
        for (const part of effectiveParts) {
            if (part.length > 0 && /^\d+$/.test(part)) {
                validPartsCount++;
            }
        }

        if (validPartsCount >= 1) {
            validCount++;
        }
    }
  }

  console.log(`valid=${validCount}`);
});
