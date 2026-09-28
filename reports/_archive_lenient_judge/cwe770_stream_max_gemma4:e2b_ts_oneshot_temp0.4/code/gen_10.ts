const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を数値に変換する
  const numbers = line.split(',').map(s => s.trim());

  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const numStr of numbers) {
    if (numStr === "") continue;

    const num = parseInt(numStr, 10);

    // 整数として解釈可能かチェックし、64bit範囲内か確認（ここではparseIntの範囲で十分と仮定）
    if (!isNaN(num)) {
      validCount++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 厳密に count=<個数> max=<最大値> を出力する
  console.log(`count=${validCount} max=${maxValue}`);
});

rl.on('close', () => {
  // プログラムの終了処理（この問題ではlineイベント内で直接出力するため、ここでは特に何もしない）
});
