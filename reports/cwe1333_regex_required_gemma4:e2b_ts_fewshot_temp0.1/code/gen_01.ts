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
    // 正規表現の解説:
    // ^ : 行の開始
    // (?: ... )* : グループが0回以上繰り返される
    // \d+ : 1桁以上の数字
    // (?:,\d+)? : カンマとそれに続く1桁以上の数字（末尾のカンマを許容するため、最後のグループはオプション）
    // $ : 行の終了
    // よりシンプルに、数字とカンマのみで構成されているかを確認する
    
    // 妥当なパターン: 1つ以上の数字とカンマの組み合わせ。末尾のカンマは許容。
    // 例: "1,2,3", "1,2,"
    // 数字とカンマのみで構成されていることを確認し、空でないことを確認する。
    
    // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する正規表現
    // 1. 数字とカンマのみで構成されているか (数字とカンマ以外の文字は許容しない)
    // 2. 少なくとも1つの数字が含まれているか
    // 3. 末尾のカンマは許容される
    
    // 判定ロジックを再考:
    // 1. 行が空でないこと (trim()でチェック済み)
    // 2. 行が数字とカンマのみで構成されていること。
    //    これは、行をカンマで分割し、すべてが数字であることを確認する方が、複雑な正規表現よりも意図に合致する可能性がある。
    
    // 仕様: 「1 個以上の数字列がカンマで区切られて並んでいる」
    // 例: "1,2,3" -> 3つの数字列
    // 例: "1,2," -> 2つの数字列 (1, 2)
    
    // 正規表現で「数字とカンマのみ」をチェックし、かつ「少なくとも1つの数字」が含まれていることを確認する。
    // \d+ は数字列。カンマは区切り。
    // パターン: 数字とカンマのみで構成され、かつ数字が少なくとも1つある。
    const pattern = /^[\d,]+$/;
    
    if (pattern.test(line)) {
      // 数字とカンマのみで構成されている
      // さらに、数字が少なくとも1つ含まれているか確認する (例: "," や ",," は除外)
      const parts = line.split(',');
      let hasNumber = false;
      for (const part of parts) {
        if (part.trim() !== "") {
          if (/^\d+$/.test(part.trim())) {
            hasNumber = true;
          } else {
            // 数字以外のものが含まれている場合 (例: "a,1") -> 不妥当
            hasNumber = false;
            break;
          }
        }
      }
      
      if (hasNumber) {
        validLines++;
      }
    }
  }

  console.log(`valid=${validLines}`);
});
