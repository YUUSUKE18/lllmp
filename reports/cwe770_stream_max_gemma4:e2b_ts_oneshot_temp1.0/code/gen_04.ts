const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',').map(s => s.trim());
  let count = 0;
  let maxVal = -Infinity;
  let hasValidNumber = false;

  for (const part of parts) {
    if (part === "") continue;
    const num = parseInt(part, 10);

    // 整数として解釈でき、64bit範囲内かを確認
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > maxVal) {
        maxVal = num;
      }
      hasValidNumber = true;
    }
  }

  // 処理が完了したか、かつ有効な数値が存在する場合のみ出力
  if (hasValidNumber) {
    console.log(`count=${count} max=${maxVal}`);
  } else {
    // 有効な整数が一つも見つからなかった場合、何も出力しない（仕様に厳密に従う）
    // ただし、もし入力が空または無効な要素のみだった場合も、何も出力しないのが適切。
  }

  rl.close();
});
