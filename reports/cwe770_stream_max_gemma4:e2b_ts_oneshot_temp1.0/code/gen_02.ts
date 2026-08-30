const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を数値に変換しようとする
  const parts = line.split(',');
  let count = 0;
  let maxVal = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = Number(trimmedPart);

    // 数値として解釈でき、64bit整数範囲内であるかチェックする（Number型は標準で64bit浮動小数点数だが、ここでは整数として扱う）
    if (!isNaN(num) && Number.isInteger(num)) {
      validCount++;
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  // 厳密に指定された形式で出力
  console.log(`count=${validCount} max=${maxVal}`);
});

rl.on('close', () => {
  // すべての入力が処理された後、終了
});
