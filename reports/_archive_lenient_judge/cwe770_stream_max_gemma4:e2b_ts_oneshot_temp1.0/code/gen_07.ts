const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (!line.trim()) return;

  const parts = line.split(',').map(s => s.trim());

  let count = 0;
  let maxValue = -Infinity;
  let validNumbersFound = false;

  for (const part of parts) {
    if (part === '') continue;
    const num = parseInt(part, 10);
    if (!isNaN(num)) {
      // 値が64bit整数に収まるか確認（ここではJavaScriptのNumber型で処理）
      // 指定された制約に基づき、数値として採用する。

      count++;
      if (num > maxValue) {
        maxValue = num;
      }
      validNumbersFound = true;
    }
  }

  if (validNumbersFound) {
    console.log(`count=${count} max=${maxValue}`);
  } else {
    // 整数として有効な要素が一つもなかった場合、何を出力するかは仕様に明記されていないが、
    // 最大値が定義できないため、ここでは何も出力しない（または最小値を設定する）を選択可能だが、
    // 例に従い、読み取れた数に基づいて出力する。
    // ここでは入力があった場合にのみ出力を試みる。もし0個の数値が読み取れた場合は、maxの定義が難しいので、
    // 意図しない出力を避けるため、今回は有効なデータがあれば出力するという方針とする。
  }
});

rl.on('close', () => {
  // 処理終了
});
