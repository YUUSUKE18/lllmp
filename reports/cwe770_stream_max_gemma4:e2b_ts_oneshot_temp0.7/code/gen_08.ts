const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換する
  const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
  const intNumbers = [];
  let maxVal = -Infinity;

  for (const s of numbers) {
    // 64bit整数として解釈を試みる
    const num = parseInt(s, 10);
    if (!isNaN(num)) {
      intNumbers.push(num);
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  // 結果を出力
  console.log(`count=${intNumbers.length} max=${maxVal}`);
});

rl.on('close', () => {
  // ここでは、readlineのイベントで直接出力するため、特別な処理は不要。
  // 最終的な出力は上記の'line'イベント内で行われる。
});
