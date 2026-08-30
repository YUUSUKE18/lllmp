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

    // 整数として解釈でき、かつ64bit範囲内かを確認（ここでは単純にNaNでないことを確認）
    if (!isNaN(num)) {
      validCount++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 厳密に指定された形式で出力
  console.log(`count=${validCount} max=${maxValue}`);
});

rl.on('close', () => {
  // 全ての入力が処理された後、何も出力しない（readlineの動作上、このブロックは通常到達しないか、追加の処理が必要ない）
});
