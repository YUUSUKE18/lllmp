const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === '') continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、64bit範囲内か確認（今回はparseIntの結果が問題となるため、純粋に数値の範囲を考慮する）
    // 通常のJavaScriptのNumber型はIEEE 754倍精度で安全だが、ここでは指示に従い数値を扱う。
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 結果を1行で出力
  console.log(`count=${count} max=${max}`);
  rl.close();
});
