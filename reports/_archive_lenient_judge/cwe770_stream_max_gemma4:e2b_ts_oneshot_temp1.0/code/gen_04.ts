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
  let maxVal = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // チェック：整数として解釈可能か、かつ64bit範囲内か（ここではparseIntで十分だが念のため）
    if (!isNaN(num)) {
      validCount++;
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  // 厳密に1行だけ出力
  console.log(`count=${validCount} max=${maxVal}`);
  rl.close();
});
