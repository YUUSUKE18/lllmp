const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  let validLines = 0;
  const regex = /^(\d+(,\d+)*)\s*$/;

  for (const line of lines) {
    // 行の前後の空白を無視するため、trim()を使用
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 正規表現で判定: 1個以上の数字とカンマの組み合わせ、および末尾のカンマの許容
    // 厳密には「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する必要がある。
    // 例: "1,2,3" はOK。 "1," はOK。 "abc" はNG。
    
    // 1. 数字とカンマのみで構成されているかを確認する
    // 正規表現の解説:
    // ^\s* : 行頭の空白
    // (?: \d+(,\d+)* )+ : 1つ以上の数字とカンマのペア（数字の後にカンマが続くパターン）
    // (?:,\d+)? : 最後の要素の後にカンマが続くパターン（末尾のカンマを許容するため）
    // $ : 行末
    
    // よりシンプルに、数字とカンマのみで構成されているか、かつ数字が少なくとも1つあるかをチェックする。
    // 妥当な形式: 数字とカンマのみで構成され、少なくとも1つの数字が含まれている。
    const match = line.match(/^\s*(\d+(,\d+)*)\s*$/);

    if (match) {
      // 正規表現がマッチした場合、数字とカンマの構造を満たしている。
      // ただし、空行や数字のみの行は除外する必要がある。
      // 例: "1,2" -> matchあり (OK)
      // 例: "1," -> matchあり (OK)
      // 例: "123" -> matchなし (NG, 間にカンマがないため)
      
      // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
      // 内部の構造をチェックする。
      const parts = line.split(',');
      
      // 1. 空行や数字とカンマ以外を含む行は妥当ではない (これは上記の正規表現でカバーされるはずだが、念のため)
      // 2. 1個以上の数字列がカンマで区切られているか
      let hasDigits = false;
      for (const part of parts) {
        if (part.trim() !== "") {
          if (/^\d+$/.test(part.trim())) {
            hasDigits = true;
          } else {
            // 数字とカンマ以外が含まれている場合 (例: "1,a,2")
            hasDigits = false;
            break;
          }
        }
      }

      if (hasDigits) {
        validLines++;
      }
    }
  }

  console.log(`valid=${validLines}`);
});
