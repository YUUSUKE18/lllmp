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
    // (?: ... )* : 非キャプチャグループ。0回以上繰り返す
    // \d+ : 1つ以上の数字
    // (?:,\d+)* : カンマとそれに続く1つ以上の数字の繰り返し（末尾のカンマも含む）
    // $ : 行の終了
    // この正規表現は、数字とカンマのみで構成され、数字が少なくとも1つあることを要求します。
    // 末尾のカンマは許容されます。
    const validRegex = /^(\d+(,\d+)*)\s*,\s*?$/;
    
    // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
    // 以下のロジックで判定します。
    
    // 1. 数字とカンマ以外を含まないかチェック
    const containsOnlyDigitsAndCommas = /^[0-9,]*$/.test(trimmedLine);

    if (!containsOnlyDigitsAndCommas) {
      continue; // 数字とカンマ以外を含む行は妥当ではない
    }

    // 2. 妥当性の判定 (1個以上の数字列がカンマで区切られているか)
    // 末尾のカンマは許容されるが、数字が少なくとも1つ存在する必要がある。
    // 例: "1,2,3" は妥当。 "1," は妥当（末尾のカンマ許容）。 "" はNG。
    
    // 末尾のカンマを削除して、数字が残っているか確認する
    const strippedLine = trimmedLine.replace(/,$/, '');
    
    if (strippedLine.length > 0) {
        // 数字が1つ以上存在する場合、かつ、元の行が数字とカンマのみで構成されている場合
        validLines++;
    } else if (trimmedLine.length > 0 && trimmedLine.endsWith(',')) {
        // 行がカンマのみ（例: "," や ",,"）の場合、これは「1個以上の数字列」ではないため不妥当
        // ただし、仕様では「末尾のカンマは許容」とあるため、数字が0個の場合をどう扱うか。
        // 「1個以上の数字列がカンマで区切られて並んでいる」を満たすためには、数字が最低1つ必要。
        // したがって、数字が0個の場合（例: "" または ","）は不妥当とする。
        continue;
    } else {
        // 空行は既にスキップ済みだが念のため
        continue;
    }
  }

  console.log(`valid=${validLines}`);
});
