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
  // 2. 1個以上の数字列がカンマで区切られているか（末尾のカンマは許容）

  // 正規表現で検証:
  // ^\s* : 行頭の空白（無視される）
  // (?:[0-9]+(?:\s*,?\s*)*) : 1つ以上の数字の塊（カンマや空白を含む）
  // (?:\s*,?\s*)* : その後に続くカンマや空白の繰り返し（0回以上）
  // $ : 行末
  // この判定は少し複雑になるため、より直接的に構造をチェックします。

  // 妥当な行の条件:
  // 1. 行が空でない。
  // 2. 行に含まれる文字が数字、カンマ、空白のみである。
  // 3. 少なくとも1つの数字列が存在する。

  // カンマで分割し、各部分が数字のみで構成されているかチェックする
  const parts = line.split(',');
  let isValid = false;

  if (parts.length > 0) {
    // 末尾のカンマが許容されるため、最後の要素が空でも問題ない
    // 例: "1,2," -> ["1", "2", ""]
    // 例: "1,2" -> ["1", "2"]

    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
        hasNumber = true;
      } else if (trimmedPart.length > 0) {
        // 数字とカンマ以外が含まれている場合
        isValid = false;
        break;
      }
    }

    if (hasNumber) {
      // 少なくとも1つの数字列が存在し、その他の文字が数字とカンマのみである
      validLines++;
    }
  }

  // 最終的な出力は、読み込みが終了した後にまとめて行うため、ここではカウントのみ行う。
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
