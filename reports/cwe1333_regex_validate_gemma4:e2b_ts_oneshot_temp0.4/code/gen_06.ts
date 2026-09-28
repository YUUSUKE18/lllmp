const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validLines = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // カンマ区切りの整数列として妥当か判定
  // 1. 数字とカンマのみで構成されているか
  // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)

  // 正規表現でチェック:
  // ^: 行の開始
  // (?:[0-9]+(?:,|$))+ : 1つ以上の数字列とカンマの組み合わせ (数字列の後にカンマまたは行末)
  // $ : 行の終了
  // この正規表現は「数字列とカンマのみ」という制約を満たすことを確認するのに役立ちますが、
  // 「1個以上の数字列がカンマで区切られている」という構造をより厳密にチェックします。

  // 妥当な形式の定義:
  // 1. 数字とカンマのみで構成されている。
  // 2. 少なくとも1つの数字列が存在する。
  // 3. 末尾のカンマは許容される。

  // 処理を簡略化するため、行をカンマで分割し、各要素が整数であることを確認します。
  const parts = line.split(',');
  let isValid = false;

  if (parts.length === 0) {
    // 空行は既に処理済みだが念のため
    isValid = false;
  } else {
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === "") {
        // カンマが連続している、または空の要素がある場合 (例: ",," や "1,,2")
        // これは「1個以上の数字列がカンマで区切られている」という要件に反する可能性がある。
        // ただし、末尾のカンマは許容されるため、最後の要素が空でも許容される。
        continue;
      }

      // 数字のみが含まれているかチェック
      if (/^\d+$/.test(trimmedPart)) {
        hasNumber = true;
      } else {
        // 数字とカンマ以外が含まれている場合
        isValid = false;
        break;
      }
    }

    // 少なくとも1つの数字列が存在し、かつ数字とカンマ以外が含まれていないこと
    if (hasNumber) {
      // 末尾のカンマの許容性:
      // 例: "1,2," -> parts = ["1", "2", ""]。hasNumber=true。これは妥当。
      // 例: "1," -> parts = ["1", ""]。hasNumber=true。これは妥当。
      // 例: "," -> parts = ["", ""]。hasNumber=false。これは不妥当。
      // 例: "abc" -> parts = ["abc"]。hasNumber=false。isValid=false。
      isValid = true;
    } else {
      // 数字が一つも含まれていない場合 (例: "," や "")
      isValid = false;
    }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
