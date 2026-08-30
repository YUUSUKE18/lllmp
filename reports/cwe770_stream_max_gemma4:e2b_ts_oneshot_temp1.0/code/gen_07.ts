const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換する
  const parts = line.split(',');
  let count = 0;
  let maxValue = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈でき、64bitの範囲内にあるかを確認（ここでは一般的な安全性を考慮）
    if (!isNaN(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 指定された形式で1行だけ出力する
  console.log(`count=${count} max=${maxValue}`);
});

rl.on('close', () => {
  // すべての入力が処理された後に終了（この実装ではlineごとに処理するため、特に何もする必要はない）
});
