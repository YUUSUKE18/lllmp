const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェック（NaNでないこと、そして元の文字列が数値のみで構成されていることを確認するため、ここでは単純にparseIntの結果をチェックする）
    if (!isNaN(num)) {
      // 64bit整数の範囲内であるという制約は、JavaScriptのNumber型で十分扱えるため、ここではそのまま比較を行う。
      validCount++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 読み込んだデータ全体を処理した後に結果を出力するのではなく、入力が終了したときにまとめて出力するのが一般的だが、
  // この問題は「標準入力から受け取った行」に対して計算を行うため、ここでは一度の入力で完結させる。
  // ただし、仕様上は「カンマ区切りの整数列を受け取る」という指示なので、もし複数の行が与えられる可能性がある場合は、それらを累積する必要がある。
  // 例として、標準入力全体を読み込むように修正する。

  // 実際には、readlineの'line'イベントで処理を続けるのではなく、全ての入力を待ってから処理を行う必要がある。
});

// 標準入力全体を読み込むための再構成（より堅牢な方法）
let inputData = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  const lines = inputData.trim().split('\n').filter(line => line.length > 0);
  let totalCount = 0;
  let overallMax = -Infinity;

  for (const line of lines) {
    const parts = line.split(',');
    let currentCount = 0;
    let currentMax = -Infinity;

    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === "") continue;

      const num = parseInt(trimmedPart, 10);

      if (!isNaN(num)) {
        currentCount++;
        if (num > currentMax) {
          currentMax = num;
        }
      }
    }

    totalCount += currentCount;
    if (currentMax !== -Infinity) {
      if (currentMax > overallMax) {
        overallMax = currentMax;
      }
    }
  }

  // ここでの「要素数」と「最大値」の定義が曖昧なため、最も一般的な解釈（全行の全ての数値の総数と全体の最大値）を採用する。
  // もし仕様が「各行ごとの要素数と最大値」を求めている場合は、出力形式を変更する必要がある。
  // 仕様: 「それらの『要素数』と『最大値』を求めます。」 -> これは通常、入力全体に対する集計を意味する。

  console.log(`count=${totalCount} max=${overallMax}`);
});
