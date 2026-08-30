const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  const parts = line.split(',');
  let set = new Set<number>();
  let totalSum = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === '') continue;

    const num = parseInt(trimmedPart, 10);

    if (!isNaN(num)) {
      // 重複を除いた整数として扱うため、Setに追加
      if (!set.has(num)) {
        set.add(num);
        totalSum += num;
      }
    }
  }

  // 厳密に 1 行だけ出力
  console.log(`count=${set.size} sum=${totalSum}`);
});

rl.on('close', () => {
  // 全ての入力が処理された後に終了（この問題ではlineごとに処理するため、ここでは特に操作は不要）
});
