const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let numbers = [];
  for (const part of parts) {
    const num = parseInt(part.trim(), 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = Array.from(new Set(numbers));
  const count = uniqueNumbers.length;
  
  // 合計を計算 (JavaScriptの標準的なNumber型は64bit浮動小数点数ですが、ここでは安全のためBigIntやより大きな数値型を考慮しますが、問題文の制約「合計は 64bit 整数の範囲に収まります」に基づき標準のNumberで十分と判断します)
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 厳密に 1 行だけ出力
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // データ読み込みが完了した後の処理（この問題ではreadlineの'line'イベント内で完結するため、ここでは特に何もしない）
});
