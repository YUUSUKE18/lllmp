const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validCount = 0;

rl.on('line', (line) => {
  // 行の前後の空白を無視するため、trim()する
  const trimmedLine = line.trim();

  if (trimmedLine === "") {
    // 空行は妥当ではない
  } else {
    // 正規表現でチェック: カンマと数字のみで構成され、少なくとも1つの数字が含まれているか
    // ^: 行の始まり
    // (?:[\d,]*): カンマと数字が0回以上続く (数字とカンマのみ)
    // [0-9]: 少なくとも1つの数字が含まれていることを保証するため、このチェックは少し工夫が必要。
    // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」を満たすか確認する。

    // 妥当性の定義を再確認:
    // 1. 1個以上の数字列がカンマで区切られている。
    // 2. 末尾のカンマは許容される。
    // 3. 空行、数字とカンマ以外は不適。

    // 正規表現で「数字とカンマのみ」の文字列であるかを確認
    const validPattern = /^[0-9,]*$/;

    if (validPattern.test(trimmedLine)) {
      // 妥当性のチェック: 少なくとも1つの数字が含まれている必要がある。
      // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」
      // 例: "1,2,3" -> OK
      // 例: "," -> NG (数字が0個)
      // 例: "" -> NG (空行で既に除外済み)

      // カンマで区切られていることを確認する。
      // 数字列の間にカンマがあるか、あるいは数字の列が存在するか。

      // 数字列のみを抽出して、その数が1以上であることを確認する。
      const parts = trimmedLine.split(',');
      
      let hasNumber = false;
      for (const part of parts) {
        if (part.trim() !== "") {
          // 数字列のみが残っているかチェック
          if (/^\d+$/.test(part)) {
            hasNumber = true;
          }
        }
      }

      // 末尾のカンマは許容されるため、最後の要素がカンマであることは許容される。
      // 重要なのは、数字が1つ以上存在すること。
      if (hasNumber) {
        validCount++;
      }
    }
  }
});

rl.on('end', () => {
  console.log(`valid=${validCount}`);
});
