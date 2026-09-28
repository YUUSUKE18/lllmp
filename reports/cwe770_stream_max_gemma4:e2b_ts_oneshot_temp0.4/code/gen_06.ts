const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換しようとする
  const parts = line.split(',');
  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈でき、かつ64bit範囲内かチェック（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      validCount++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 厳密に1行だけ出力
  console.log(`count=${validCount} max=${maxValue}`);
});

rl.on('close', () => {
  // 入力終了時の処理（この問題ではlineイベントで即時出力するため、ここでは特に何もしない）
});
