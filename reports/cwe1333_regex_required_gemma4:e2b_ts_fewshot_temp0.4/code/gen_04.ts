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
    // 行の前後の空白を無視するため、トリムする
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 正規表現で判定
    // 1. 行全体が数字とカンマのみで構成されているか
    // 2. 末尾のカンマは許容される (ただし、末尾の数字がない場合は空行とみなされるため、ここではより厳密に)
    // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
    // 末尾のカンマは許容。空行はNG。数字とカンマ以外はNG。

    // 正規表現の解説:
    // ^\s*             : 行頭の空白（無視されるため、トリムで対応可能だが、ここでは行全体をチェックするため）
    // (?:             : 非キャプチャグループの開始
    //   \d+           : 1つ以上の数字
    //   (?:,\d+)*     : カンマと1つ以上の数字の繰り返し（複数の数字列）
    // )               : グループの終わり
    // (?:,\d+)?       : オプションの最後のカンマと数字（末尾のカンマ許容のため）
    // \s*$            : 行末の空白
    
    // より簡潔に、数字とカンマのみで構成され、少なくとも1つの数字が含まれているかを確認する
    // 妥当なパターン: 数字とカンマのみで構成され、数字が少なくとも1つある。末尾のカンマは許容。
    
    // 1. 数字とカンマ以外の文字が含まれていないかチェック
    const containsOnlyDigitsAndCommas = /^[0-9,]*$/.test(line);
    
    if (!containsOnlyDigitsAndCommas) {
      continue; // 数字とカンマ以外を含む行は妥当ではない
    }

    // 2. 少なくとも1つの数字が含まれているかチェック (空行は既に除外済み)
    // 数字が含まれているかを確認するために、カンマで分割して、少なくとも1つの要素が数字であることを確認する。
    const parts = line.split(',');
    let hasNumber = false;
    for (const part of parts) {
        if (part.trim() !== "") {
            if (/^\d+$/.test(part.trim())) {
                hasNumber = true;
            }
        }
    }
    
    if (hasNumber) {
        validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
