process.stdin.resume();
process.stdin.setEncoding("utf8");

let validCount = 0;
let inputData = "";

process.stdin.on("data", (data: string) => {
  inputData += data;
});

process.stdin.on("end", () => {
  const lines = inputData.split('\n');
  let validLines = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 末尾のカンマが許容されるため、カンマで分割した後、空文字列や数字のみのセグメントをチェックする。
    // 妥当なパターン: 1個以上の数字とカンマが混在していること。
    // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」を判定する。
    // 例: "1,2,3" -> ["1", "2", "3"] (3個の数字)
    // 例: "1,2," -> ["1", "2", ""] (3個の要素)
    
    // 妥当な行の判定ロジック:
    // 1. カンマで分割した結果が、少なくとも1つの非空要素を含むこと。
    // 2. その要素の中に、数字以外が含まれていないこと（数字とカンマのみ）。
    
    const parts = trimmedLine.split(',');
    
    if (parts.length === 0) {
        // 空行は既にスキップ済みだが念のため
        continue;
    }

    let containsNumber = false;
    let isValidFormat = true;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            // 末尾のカンマや連続するカンマによる空要素は許容されるが、
            // 少なくとも数字が含まれていればOKとする。
            continue;
        }
        
        // 数字のみで構成されているかチェック（数字とカンマ以外を含まないか）
        if (!/^\d+$/.test(trimmedPart)) {
            // 数字とカンマ以外を含む場合、妥当ではない
            isValidFormat = false;
            break;
        }
        
        // 数字が含まれていた場合
        containsNumber = true;
    }

    if (isValidFormat && containsNumber) {
        validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
