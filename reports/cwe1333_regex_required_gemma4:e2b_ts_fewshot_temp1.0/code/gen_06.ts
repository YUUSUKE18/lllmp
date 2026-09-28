const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  let validCount = 0;
  const regex = /^(\d+,\d+)*\d+)?$|^(\d+,\d+)+$|^(\d+)\s*,$?*$/;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      continue;
    }

    // 妥当性の判定ロジックを正規表現で実装します。
    // 仕様: 1 個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
    // 空行、および数字とカンマ以外を含む行は妥当ではない。

    // 1. 数字とカンマのみで構成されているか、またはそれに近い構造かを確認
    // 許容されるパターン: 1個以上の数値とカンマの組み合わせ。
    // 例: "1,2,3", "1,2,3,", "1,2,3,4"
    // 判定を簡略化するため、行全体が数字、カンマ、空白のみで構成されているか、
    // そして少なくとも1つの数値が含まれているかをチェックします。

    // 正規表現による厳密な判定:
    // ^\s*                      - 行頭の空白
    // (?:                   - 非キャプチャグループ開始
    //   \d+,\s*              - 1つ以上の数字、カンマ、任意の空白
    // )+                      - 上記グループが1回以上繰り返される
    // \d+                     - 最後の数値
    // (?:,\s*)*                - 末尾のカンマと空白の繰り返し（末尾のカンマを許容するため）
    // $                       - 行末
    //
    // より簡潔に、数字とカンマのみで構成され、最低1つの数字が含まれているかを判定します。

    // 正規表現で「数字とカンマ」のみで構成されているかを確認
    const containsOnlyDigitsAndCommas = /^[0-9,]*$/.test(line);

    if (containsOnlyDigitsAndCommas) {
      // 1. 空行でないこと（既にtrim()でチェック済みだが、ここでは元の行を基準にする）
      // 2. 少なくとも1つの数字が含まれていること
      const numbers = line.split(',');
      const hasNumbers = numbers.some(n => n.trim() !== "");

      if (hasNumbers) {
        validCount++;
      }
    }
  }

  console.log(`valid=${validCount}`);
});
