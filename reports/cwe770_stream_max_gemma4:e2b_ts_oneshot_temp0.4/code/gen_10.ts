const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換しようと試みる
  const parts = line.split(',');
  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能か、かつ64bit範囲内かチェック（ここではparseIntの範囲に依存するが、問題文の制約に従う）
    if (!isNaN(num)) {
      // 64bit整数の範囲内であるという制約があるが、JavaScriptのNumber型はIEEE 754倍精度であり、安全性を考慮してそのまま比較を行う。
      validCount++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 結果を出力
  console.log(`count=${validCount} max=${maxValue}`);
  rl.close();
});
