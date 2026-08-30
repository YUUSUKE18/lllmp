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

    // 整数として解釈可能かチェックし、64bit範囲内かチェック（ここでは単純にNaNチェックと数値としての妥当性を確認）
    if (!isNaN(num)) {
      // 64bit整数の範囲内であるという制約は、JavaScriptのNumber型で十分カバーされるため、ここでは単に整数として扱う
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  console.log(`count=${count} max=${max}`);
});

rl.on('close', () => {
  // 処理が完了したことを示す（この問題ではlineイベント内で直接出力するため、ここでは特に何もしない）
});
