const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  const parts = line.split(',');
  let uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const part of parts) {
    // 空白を除去して整数に変換を試みる
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として有効かチェック
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  // 重複を除いた整数の個数と合計を計算
  const count = uniqueNumbers.size;
  uniqueNumbers.forEach(n => {
    sum += n;
  });

  // 厳密に 1 行だけ出力
  console.log(`count=${count} sum=${sum}`);
  rl.close();
});
