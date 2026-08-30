const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineNumber = 0;

rl.on('line', (line) => {
  lines.push(line);
  lineNumber++;
});

rl.on('close', () => {
  let validLines = 0;
  for (const line of lines) {
    // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定する
    // 妥当な条件: 1個以上の数字列がカンマで区切られていること。末尾のカンマは許容。
    
    // 1. 行から前後の空白を除去
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 2. カンマ区切りで分割する。末尾のカンマは許容する。
    // 正規表現で、カンマで区切られた数字の塊を抽出する。
    // 例: "1,2,3," -> ["1", "2", "3", ""] (split(',')の結果)
    const parts = trimmedLine.split(',');
    
    // 妥当な数字列が1つ以上存在するかチェックする。
    // 空の文字列（数字列がない部分）を除外して、数字列が残っているか確認する。
    let hasNumber = false;
    for (const part of parts) {
        if (part.trim() !== "") {
            // 数字列であるかチェック
            if (/^\d+$/.test(part.trim())) {
                hasNumber = true;
            } else {
                // 数字とカンマ以外の文字が含まれている場合は妥当ではない
                console.log(`valid=0`); // 妥当でない行が見つかった時点で終了（ただし、ここでは全行をチェックする必要があるため、後で集計する）
                // 仕様に基づき、「数字とカンマ以外を含む行は妥当ではない」という制約を厳密に適用する。
                // ここでは、行全体が「カンマ区切りの整数列」であるか、という解釈で進める。
                // 「1 個以上の数字列がカンマで区切られて並んでいる」ことを満たすか。
            }
        }
    }

    // 厳密な判定ロジックを再構築:
    // 行が「カンマ区切りの整数列」であるか？
    // 1. 空行はNG。
    // 2. 数字とカンマ以外を含む行はNG。
    // 3. 1個以上の数字列がカンマで区切られて並んでいる。

    let isValid = true;
    
    // 1. 数字とカンマ以外を含むかチェック
    for (let i = 0; i < trimmedLine.length; i++) {
        const char = trimmedLine[i];
        if (!/^\d|,$/.test(char)) {
            isValid = false;
            break;
        }
    }
    if (!isValid) {
        continue;
    }

    // 2. カンマ区切りで分割し、数字列が1つ以上あるかチェック
    const actualParts = trimmedLine.split(',');
    let count = 0;
    for (const part of actualParts) {
        if (part.trim() !== "") {
            // 数字列として有効か確認
            if (/^\d+$/.test(part)) {
                count++;
            } else {
                // 数字とカンマ以外を含む行は上記で既に除外されているはずだが、念のため
                isValid = false;
                break;
            }
        }
    }
    
    if (isValid && count >= 1) {
        validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
