const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を数値に変換する
  const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);

  let count = 0;
  let maxVal = -Infinity;

  for (const str of numbers) {
    // 整数として解釈可能かチェックし、数値に変換する（64bit範囲内を想定）
    const num = parseInt(str, 10);
    if (!isNaN(num)) {
      count++;
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  // 結果を出力
  console.log(`count=${count} max=${maxVal}`);
});

rl.on('close', () => {
  // 標準入力が終了した後に処理が完了する
});
