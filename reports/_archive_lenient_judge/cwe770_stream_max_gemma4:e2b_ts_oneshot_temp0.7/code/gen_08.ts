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

    // 整数として解釈できるかチェックし、64bit範囲内か（今回はparseIntの範囲に依存するが、問題文の制約に従う）
    // ここでは、もしparseIntが有効な整数を返した場合のみカウントする。
    if (!isNaN(num)) {
      validCount++;
      // 64bit整数の制約を満たすことを確認（JavaScriptのNumber型はIEEE 754倍精度であり、安全範囲内）
      if (num > max) {
        max = num;
      }
    }
  }

  // 最終的な結果を出力
  console.log(`count=${validCount} max=${max}`);
  rl.close();
});
