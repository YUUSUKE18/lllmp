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

    // 数値として解釈できるか確認し、64bit整数範囲内か確認する（ここでは単純にNaNチェックと数値の扱いに焦点を当てる）
    if (!isNaN(num) && isFinite(num)) {
      validCount++;
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  // 厳密に1行だけ出力する
  console.log(`count=${validCount} max=${maxVal}`);
  rl.close();
});
