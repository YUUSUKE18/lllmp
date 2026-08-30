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
    // 末尾のカンマは許容する
    if (line.length > 0) {
      // カンマで分割して、空でない要素があるかチェックする
      const parts = line.split(',');
      // 末尾のカンマがあっても、splitの結果には空文字列が含まれる可能性があるため、
      // 実際に数字列が存在するかどうかを確認する
      let hasValidNumber = false;
      for (const part of parts) {
        if (part.trim() !== "") {
          // 数字のみで構成されているかチェック（数字とカンマ以外が含まれていないか）
          if (/^\d+$/.test(part.trim())) {
            hasValidNumber = true;
            break;
          } else {
            // 数字とカンマ以外が含まれている場合、妥当ではない
            hasValidNumber = false;
            break;
          }
        }
      }
      
      // 妥当な条件: 1個以上の数字列がカンマで区切られて並んでいること。
      // これは、少なくとも1つの非空の数字列が存在し、かつ、行が数字とカンマのみで構成されていることを意味する。
      // 仕様の解釈: 「1 個以上の数字列がカンマで区切られて並んでいる」
      // 例: "1,2,3" -> 3つの数字列。
      // 例: "1," -> 2つの数字列（"1", ""）。末尾のカンマは許容。
      // 例: "," -> 2つの数字列（"", ""）。
      // 例: "abc" -> 妥当ではない（数字とカンマ以外を含む）
      // 例: "" -> 妥当ではない（空行）

      // 妥当性の判定を再評価:
      // 1. 空行は妥当ではない。
      if (line.length === 0) continue;

      // 2. 数字とカンマ以外を含む行は妥当ではない。
      const containsOnlyDigitsAndCommas = /^[0-9,]*$/.test(line);

      if (!containsOnlyDigitsAndCommas) {
        continue;
      }

      // 3. 1個以上の数字列がカンマで区切られて並んでいること。
      // これは、カンマで分割した結果、少なくとも1つの非空の数字列が存在すれば良い。
      const parts = line.split(',');
      let hasAtLeastOneNumber = false;
      for (const part of parts) {
        if (part.trim() !== "") {
          // 数字のみで構成されているか（前述のチェックで既に確認済みだが念のため）
          if (/^\d+$/.test(part.trim())) {
            hasAtLeastOneNumber = true;
            break;
          }
        }
      }

      if (hasAtLeastOneNumber) {
        validCount++;
      }
    }
  }

  console.log(`valid=${validCount}`);
});
