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
  let isValid = true;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = Number(trimmedPart);

    if (!isNaN(num) && isFinite(num)) {
      count++;
      if (num > maxVal) {
        maxVal = num;
      }
    } else {
      // 整数として解釈できない要素は無視するが、ここでは次の処理に進む
      isValid = false; // ここでの isValid の意味は厳密には不要だが、全体的なフィルタリングに影響を与える
    }
  }

  // 厳密に指定された形式で出力
  console.log(`count=${count} max=${maxVal}`);
  rl.close();
});
