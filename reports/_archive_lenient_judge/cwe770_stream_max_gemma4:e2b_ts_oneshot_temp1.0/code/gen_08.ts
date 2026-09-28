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
  let validCount = 0;

  for (const part of parts) {
    if (part === "") continue;

    const num = parseInt(part, 10);

    // 整数として解釈可能で、かつ64bit範囲内かチェック（今回は入力が保証されているため、NaNチェックを主とします）
    if (!isNaN(num)) {
      // 64bit整数の制約はJavaScriptのNumber型で十分カバーされるため、ここでは単純に最大値を求めます。
      validCount++;
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  console.log(`count=${validCount} max=${maxVal}`);
});

rl.on('close', () => {
  // ファイルの読み込みが完了したことを示す（この問題設定ではlineイベントで十分だが、念のため）
});
