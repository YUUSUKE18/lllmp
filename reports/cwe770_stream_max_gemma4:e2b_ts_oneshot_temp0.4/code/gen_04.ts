const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換する
  const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
  
  let count = 0;
  let maxValue = -Infinity;

  for (const numStr of numbers) {
    const num = parseInt(numStr, 10);
    // 整数として解釈でき、かつ64bit範囲内（ここでは単純にNaNチェックと最大値更新を行う）
    if (!isNaN(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 厳密に count=<個数> max=<最大値> を出力
  console.log(`count=${count} max=${maxValue}`);
});

rl.on('close', () => {
  // 入力終了後の処理は不要だが、readlineの仕組み上ここで終了する
});
