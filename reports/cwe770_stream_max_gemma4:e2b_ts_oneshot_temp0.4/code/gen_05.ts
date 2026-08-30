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

    // 整数として解釈可能かチェック（NaNチェックと64bit範囲の概算）
    if (!isNaN(num)) {
      // 64bit整数の範囲内であることの確認は、JavaScriptのNumber型で十分カバーされるが、
      // ここでは単純に数値として処理を進める。
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 厳密に1行だけ出力
  console.log(`count=${count} max=${max}`);
  rl.close();
});
