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
  // 実際には、ここでは入力されたすべての行を処理する必要があります。
  // readlineインターフェースを使用する場合、'line'イベントで個々の行が提供されます。
  // この問題の仕様では、標準入力全体を読み込む必要があります。
  // rl.on('line')で各行が処理された後、最終的な結果を出力します。

  // 課題の要求に従い、標準入力全体を処理した結果を出力します。
  // ここでは、readlineのイベントフローを修正し、行ごとの検証を行います。
  // 最初にreadlineを使用して入力全体を処理します。
});

// 標準入力全体を読み込むように、readlineの標準的な使い方を修正します。
// ただし、ここでは「標準入力全体を読み込む」ため、メモリに蓄積するアプローチに戻します。

let inputData = '';

process.stdin.on('data', (chunk) => {
  inputData += chunk.toString();
});

process.stdin.on('end', () => {
  const linesArray = inputData.split('\n');
  let validCount = 0;

  for (const line of linesArray) {
    // 行の前後の空白を無視します。
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // カンマ区切りの整数列として妥当かチェック
    // 妥当条件: 1個以上の数字列がカンマで区切られて並んでいる。末尾のカンマは許容。
    // 数字とカンマ以外を含む行は妥当ではない。

    // 正規表現でチェック: カンマで区切られており、その間に数字（または数字の羅列）のみが含まれているか。
    // 末尾のカンマは許容される。
    // 例: "1,2,3," はOK。
    // 例: "a,1,2" はNG。
    // 例: "1,,2" はNG（空の要素が許容されないと解釈）

    // 最も厳密な解釈:
    // 1. 行に含まれる文字が数字、カンマ、空白のみであること。
    // 2. その行が最低1つの数字を含んでいること（カンマで区切られていること）。

    // カンマで分割し、各要素が数字のみで構成されているか、または空文字列（末尾カンマの影響）を確認する。
    
    // 末尾のカンマを一時的に除去して処理しやすくする
    const processedLine = trimmedLine.endsWith(',') ? trimmedLine.slice(0, -1) : trimmedLine;
    
    // 1. カンマで分割
    const parts = processedLine.split(',');
    
    if (parts.length === 0) {
        // これは空行チェックで既に除外されているはずだが念のため
        continue;
    }

    let allAreNumbers = true;
    let hasNumbers = false;

    for (const part of parts) {
        // 各部分が空文字列でないか、数字のみで構成されているかを確認
        if (part.length > 0) {
            // 数字のみで構成されているかチェック (小数点やその他の文字を含まないことを想定)
            if (!/^\d+$/.test(part)) {
                allAreNumbers = false;
                break;
            }
            hasNumbers = true;
        }
    }
    
    // 末尾のカンマが許容されるため、partsの最後の要素が空であっても許容する（例: "1,2," -> ["1", "2", ""]）
    // 空の要素が許容されない、つまり数字が少なくとも1つ含まれている必要がある。
    
    if (allAreNumbers && hasNumbers) {
        // この行は妥当
        validCount++;
    } else {
        // 妥当でない（空行、数字とカンマ以外、数字を含まないなど）
        // console.error(`Invalid line: "${line}"`); // デバッグ用
    }
  }

  // 最終結果を出力
  console.log(`valid=${validCount}`);
});
