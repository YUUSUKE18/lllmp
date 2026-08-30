const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const input = Buffer.concat(data).toString("utf8");
  const lines = input.split("\n");
  let validLines = 0;

  // 各行を検証
  for (const line of lines) {
    // 行の前後の空白を無視するため、trim() を使用
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 正規表現による検証:
    // ^: 行の開始
    // [0-9,]*: 0個以上の数字またはカンマ
    // $: 行の終了
    // この正規表現だけでは「1個以上の数字列がカンマで区切られている」ことを厳密に保証できないため、
    // 以下のロジックで分割して検証する。

    // カンマで分割し、各要素が数字のみで構成されているかを確認する
    const parts = trimmedLine.split(',');
    
    // 末尾のカンマが許容されるため、最後の要素が空文字列になる可能性がある
    // 例: "1,2," -> ["1", "2", ""]

    let isValid = true;
    let hasDigits = false;
    
    for (const part of parts) {
        const trimmedPart = part.trim();
        
        if (trimmedPart === "") {
            // カンマが連続している場合 (例: "1,,2" や末尾のカンマ)
            // 末尾のカンマは許容されるが、中間や始まりに空要素がある場合は不適
            if (trimmedLine.endsWith(',') && part === "") {
                // 末尾のカンマは許容されるため、最後の要素が空の場合は無視する
                continue;
            } else if (trimmedLine.includes(',') && part === "") {
                // カンマで区切られた部分に空文字列が含まれるのは不適
                isValid = false;
                break;
            }
        }

        // 各部分が整数のみで構成されているか確認
        if (!/^\d+$/.test(trimmedPart)) {
            isValid = false;
            break;
        }
        
        if (trimmedPart.length > 0) {
            hasDigits = true;
        }
    }

    // 妥当性の判定: 1個以上の数字列がカンマで区切られていること
    // これは、分割後の要素が少なくとも1つあり、かつその中に数字が含まれている必要がある。
    // 例: "1" -> ["1"] -> OK
    // 例: "1," -> ["1", ""] -> OK (最後の空は末尾のカンマ由来)
    // 例: "," -> ["", ""] -> NG (行が空でない前提だが、これは数字列ではない)
    // 例: "abc" -> ["abc"] -> NG
    
    // 妥当性の再評価:
    // 1. 行が空でないこと (trimmedLine !== "")
    // 2. カンマで区切られた要素のうち、少なくとも1つが有効な数字列であること。
    
    if (trimmedLine !== "") {
        // カンマで区切られた部分が1つ以上存在し、かつそれらのうち少なくとも1つが数字である必要がある。
        // 末尾のカンマは許容される。
        const nonTrimmedParts = trimmedLine.split(',');
        let actualDigitsCount = 0;
        
        for(const part of nonTrimmedParts) {
            const trimmedPart = part.trim();
            if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
                actualDigitsCount++;
            }
        }
        
        // 妥当な行は、カンマで区切られた要素が1つ以上存在し、その中で少なくとも1つの有効な数字列を含む場合。
        // 単純に「1個以上の数字列がカンマで区切られて並んでいる」という定義を、「カンマで分割した結果、空でない数字列が1つ以上存在する」と解釈する。
        if (actualDigitsCount > 0) {
            validLines++;
        }
    }
  }

  console.log(`valid=${validLines}`);
});
