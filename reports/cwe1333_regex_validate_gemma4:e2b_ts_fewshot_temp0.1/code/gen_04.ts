const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let validCount = 0;
  for (const line of lines) {
    // 末尾のカンマを許容しつつ、カンマ区切りの整数列が存在するかを判定する
    // 正規表現で、カンマで区切られた数字の並びが存在するかを確認する
    // 許容されるパターン: 0個以上のカンマ、数字、0個以上のカンマ
    // 厳密には「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
    // 例: "1,2,3" -> OK, "1," -> OK, "," -> NG, "" -> NG
    
    // 1. 行が空でないことを確認
    if (line === "") {
      continue;
    }

    // 2. 行が数字とカンマのみで構成されているか、またはその一部であるかを確認する
    // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいる。
    // これは、行をカンマで分割した結果、空でない要素が1つ以上存在すれば良い、と解釈する。
    
    // 末尾のカンマを許容するため、行全体を処理する。
    // 妥当な行の判定ロジックを再検討する。
    // 「1 個以上の数字列がカンマで区切られて並んでいる」
    // 例: "1,2,3" -> 3つの数字列
    // 例: "1," -> 2つの数字列 (1, "")
    // 例: "," -> 2つの数字列 ("", "")
    
    // 妥当な行の判定:
    // 行をカンマで分割し、空でない要素が1つ以上存在するかどうか。
    const parts = line.split(',');
    let hasNumber = false;
    for (const part of parts) {
      if (part.trim() !== "") {
        hasNumber = true;
      }
    }

    // 妥当な行の条件: 1個以上の数字列がカンマで区切られて並んでいる。
    // これは、分割後の要素の中に少なくとも1つの非空の文字列（数字列）が存在すれば良い、と解釈する。
    // ただし、"1," の場合、parts=["1", ""], hasNumber=true。これは妥当。
    // "," の場合、parts=["", ""], hasNumber=false。これは妥当ではない。
    
    // 妥当な行の判定を「数字列が1つ以上存在する」と定義し直す。
    // 1. 行が空でない。
    // 2. 行に含まれる文字が数字とカンマのみである。
    // 3. カンマで分割した際に、少なくとも1つの非空の数字列が存在する。
    
    // 課題の記述を厳密に解釈: 「1 個以上の数字列がカンマで区切られて並んでいる」
    // これは、カンマで区切られた要素のうち、数字として解釈できるものが1つ以上あることを意味する。
    
    let isValid = false;
    if (line.length > 0) {
        const numbers = line.split(',');
        let foundNumber = false;
        for (const numStr of numbers) {
            if (numStr.trim() !== "") {
                // 数字としてパース可能かチェック
                if (!isNaN(parseInt(numStr.trim(), 10))) {
                    foundNumber = true;
                }
            }
        }
        if (foundNumber) {
            isValid = true;
        }
    }

    if (isValid) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
