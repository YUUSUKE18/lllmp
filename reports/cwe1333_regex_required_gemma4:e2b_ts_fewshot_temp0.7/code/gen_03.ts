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
  // 各行を正規表現でチェック
  // 正規表現の解説:
  // ^\s*       : 行の先頭の任意の空白文字
  // [0-9,]*    : 0個以上の数字またはカンマ (数字とカンマのみを含む)
  // \s*$       : 行の末尾の任意の空白文字
  // この正規表現が「数字とカンマのみ」という条件をチェックするのに使われますが、
  // 課題の仕様「1 個以上の数字列がカンマで区切られて並んでいる」を厳密にチェックするためには、
  // 行全体を評価する必要があります。

  // より厳密なチェックとして、行が「数字とカンマ」のみで構成されており、
  // 少なくとも1つの数字が含まれているか、またはカンマのみで構成されているかを考慮する必要があります。

  // 仕様を再解釈: 「1 個以上の数字列がカンマで区切られて並んでいる」
  // これは、行がカンマで区切られた数値の集合である、ということを意味します。
  // 例: "1,2,3" (OK), "1,2," (OK), "," (NG, 数字列が1個未満), "abc" (NG)

  // 1. 行をトリムして、カンマで分割する
  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 2. 正規表現で検証: 数字とカンマのみで構成されているか確認
    // 許容される文字は数字(0-9)とカンマ(,)のみ。
    const regex = /^[0-9,]*$/;
    if (!regex.test(trimmedLine)) {
      // 数字とカンマ以外を含む行は妥当ではない
      continue;
    }

    // 3. 妥当性の最終チェック: 1個以上の数字列がカンマで区切られているか
    // カンマで分割し、空でない要素（数字列）の数を数える。
    const parts = trimmedLine.split(',');
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
        hasNumber = true;
      }
    }

    // 末尾のカンマは許容されるため、partsの最後の要素が空でも問題ない。
    // 例: "1,2," -> ["1", "2", ""]。数字列は2個ある。
    // 例: "," -> ["", ""]。数字列は0個。
    // 例: "1," -> ["1", ""]。数字列は1個。
    // 例: ",," -> ["", "", ""]。数字列は0個。

    // 妥当である条件: 1個以上の数字列がカンマで区切られて並んでいること。
    // これは、少なくとも1つの数字列が存在すれば良い。
    if (hasNumber) {
      validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
