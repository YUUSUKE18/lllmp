const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるか、64bit範囲内かを確認（ここでは単純にNaNチェックと数値としての妥当性を確認）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 厳密に指定された形式で出力
  console.log(`count=${count} max=${max}`);
  rl.close();
});
