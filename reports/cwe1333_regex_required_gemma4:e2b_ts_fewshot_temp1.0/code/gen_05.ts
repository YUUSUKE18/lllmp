const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineNumber = 0;

rl.on('line', (line) => {
  lines.push(line);
  lineNumber++;
});

rl.on('close', () => {
  let validLinesCount = 0;
  // 妥当な行の判定: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
  // 正規表現:
  // ^\s*                   -> 行の先頭の空白
  // (?:                  -> 非キャプチャグループ開始
  //   \d+                -> 1つ以上の数字
  //   ,                  -> カンマ
  // )*                   -> (数字, のパターンが0回以上繰り返される)
  // (?:                  -> 非キャプチャグループ開始
  //   \d+                -> 1つ以上の数字 (最後の要素)
  // )
  // .*                   -> その他の文字（末尾のカンマなども含む）
  // $                    -> 行の終わり

  // よりシンプルに、カンマ区切りの数字列が存在するかどうかをチェックします。
  // 妥当な行は「数字とカンマのみ」で構成され、少なくとも一つの数字が含まれている必要があります。

  for (const line of lines) {
    // 行の前後の空白を無視して処理するために、行をトリム
    const trimmedLine = line.trim();

    if (trimmedLine.length === 0) {
      continue; // 空行は妥当ではない
    }

    // 正規表現を使って、行が数字とカンマのみで構成されているか、かつ少なくとも1つの数字が含まれているかをチェック
    // パターン解説:
    // ^\s*                   : 行の先頭の空白
    // (?:                   : 非キャプチャグループ開始
    //   \d+                : 1つ以上の数字
    //   ,?                 : 0個または1個のカンマ (最後の要素を除くため、ここでは末尾のカンマの扱いを調整する)
    // )+                    : (数字, のパターンが1回以上繰り返される)
    // \s*                   : 行末の空白
    // このチェックでは、末尾のカンマを許容しつつ、全体が数字とカンマで構成されているかを確認する必要があります。

    // 仕様の再解釈: 「1 個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容します。」
    // これは、行内に数字とカンマが混在している状態を許容します。

    // 妥当な行の条件:
    // 1. 空行ではない。
    // 2. 数字とカンマ以外の文字を含まない（空白を除く）。
    // 3. 少なくとも1つの数字が含まれている。

    // 最初の試みとして、行をカンマで分割し、すべてが数字に変換できるかを確認するアプローチを採用します。
    const parts = line.split(',');
    let containsDigit = false;
    let allValid = true;

    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length === 0) {
        // 空の要素は許容される（例: "1,,2" の中間）
        continue;
      }

      // その部分が整数であるか確認
      if (!/^\d+$/.test(trimmedPart)) {
        allValid = false;
        break;
      }
      containsDigit = true;
    }

    // 最後に、行が完全に数字とカンマ（および空白）のみで構成されているかを確認する必要がある。
    // 仕様：「空行、および数字とカンマ以外を含む行は妥当ではありません。」

    // 行全体が数字、カンマ、空白のみで構成されているか、かつ数字が含まれているかを確認する正規表現
    // これは、行全体を読み取り、その内容が「(数字とカンマの組み合わせ) + (空白)」のみであるかを検証する。
    // より厳密には、行を構成する全ての文字が数字、カンマ、空白のいずれかである必要があります。
    const strictPattern = /^[0-9, \t\n]*$/;
    
    if (strictPattern.test(line)) {
        // 数字が少なくとも1つ含まれていれば妥当
        if (containsDigit) {
            validLinesCount++;
        }
    }
  }

  console.log(`valid=${validLinesCount}`);
});
