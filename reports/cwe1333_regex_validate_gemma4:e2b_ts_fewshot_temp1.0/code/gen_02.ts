const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines = 0;

rl.on('line', (line) => {
  lines++;
});

rl.on('close', () => {
  // 実際には、readlineのイベントで各行を処理し、最終的な結果を出力する必要があります。
  // この問題の性質上、入力全体を一度に受け取って処理する方が簡単ですが、
  // `rl.on('line', ...)` の逐次処理を想定して、ここでは入力が完了した後の処理を記述します。
  // しかし、課題の要求は「標準入力全体を読み」、その結果を「1行出力」です。
  // Node.jsの標準的なストリーム処理に合わせるため、ストリーム全体を読み込む方式を採用します。
  // ここでは、提供された例の形式に従い、ストリーム処理を再構成します。
});

// 標準入力全体を読み込む処理 (例1, 2, 3の形式に合わせる)
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const linesArray = s.split('\n');
  let validLines = 0;

  for (const line of linesArray) {
    // 行の前後の空白を無視
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // カンマ区切り整数列の妥当性をチェック
    // 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。
    // 末尾のカンマは許容される。
    
    // カンマで分割し、各要素をチェック
    const parts = line.split(',');
    
    // 妥当性の判定ロジック：
    // 1. 空行でない (既にチェック済み)
    // 2. 数字とカンマ以外を含まない。
    // 3. 1個以上の数字列がカンマで区切られている。
    
    let hasDigits = false;
    let isValidStructure = true;

    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === "") {
        // カンマの連続 (例: "1,,2" や ",1")
        // 末尾のカンマは許容されるため、空の要素があっても、それが意図された構造の一部である限りは問題ないが、
        // 「数字列がカンマで区切られている」ことを厳密に解釈する。
        // 妥当なのは「1個以上の数字列がカンマで区切られている」こと。
        // もし空の要素が連続する場合（例: ",,"）、それは数字列ではないため、
        // 厳密には「数字列がカンマで区切られている」という条件を満たさない可能性がある。
        // しかし、「末尾のカンマは許容する」ため、ここでは数字のみが含まれているかを確認する。
        continue;
      }
      
      // partが純粋な整数文字列であるかチェック (数字とカンマ以外を含まないこと)
      if (!/^\d+$/.test(trimmedPart)) {
        isValidStructure = false;
        break;
      }
      
      // 数字列が見つかった
      hasDigits = true;
    }

    if (isValidStructure && hasDigits) {
      validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
