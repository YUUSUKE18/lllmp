const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validCount = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 正規表現でカンマ区切りの整数列をチェック
  // ^\s* : 行頭の空白を許容
  // (?:[0-9]+,\s*)* : 1つ以上の数字とカンマ、それに続く空白の繰り返し（数字とカンマのペア）
  // [0-9]+ : 最後の数字列
  // (?:,\s*|$) : 末尾のカンマと空白、または行末
  // この仕様の「1 個以上の数字列がカンマで区切られて並んでいる」を厳密に解釈する。
  // 1個以上の数字列 (N1, N2, ..., Nk) がカンマで区切られている。
  // これは、数字とカンマのペアが連続していることを意味する。

  // 1. 数字とカンマのみで構成されているかを確認
  // 数字とカンマ、および空白以外の文字が含まれていないかチェックする。
  const regex = /^\s*([0-9]+,\s*)+[0-9]+?\s*$/;

  // より厳密に、「カンマで区切られた整数列」を検証する。
  // 許容されるパターン: 数字, 数字, ..., 数字 (末尾のカンマは許容)

  // 1. 全てが数字とカンマ、空白のみで構成されているか確認
  // このチェックは非常に複雑になるため、期待される構造に基づいて検証する。
  // 妥当な行は、カンマで区切られた整数が少なくとも1つ以上存在し、それ以外の文字がないこと。

  let isValid = false;
  if (trimmedLine.length > 0) {
    // 1. 行がカンマで区切られているか（カンマが存在するか）
    if (trimmedLine.includes(',')) {
      // 2. カンマと数字以外の文字が存在しないか
      // カンマと数字のみで構成されているか確認
      const parts = trimmedLine.split(',');
      let allAreNumbers = true;
      for (const part of parts) {
        // 各部分が数字のみ（空白を除く）であることを確認
        if (part.trim() !== "" && !/^\d+$/.test(part.trim())) {
          allAreNumbers = false;
          break;
        }
      }
      
      // 3. 1個以上の数字列が存在するか
      if (allAreNumbers) {
          // カンマで区切られた部分のうち、空でないものが1つ以上あれば妥当
          const nonBlankParts = parts.filter(p => p.trim() !== "");
          if (nonBlankParts.length >= 1) {
              isValid = true;
          }
      }
    }
  }

  if (isValid) {
    validCount++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validCount}`);
});
