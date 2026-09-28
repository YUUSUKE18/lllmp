const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === '') continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェック（NaNでないこと、そして元の文字列が数字のみで構成されていることを確認するため）
    if (!isNaN(num)) {
      // 64bit整数の範囲内であるか（ここではJavaScriptのNumber型で十分だが、仕様に従う）
      // 標準のNumber型はIEEE 754倍精度であり、安全な整数演算範囲をカバーしている。
      validCount++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 要素数と最大値を出力
  console.log(`count=${validCount} max=${max}`);
});

rl.on('close', () => {
});
