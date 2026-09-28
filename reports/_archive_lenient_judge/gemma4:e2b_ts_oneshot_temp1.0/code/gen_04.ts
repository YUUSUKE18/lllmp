const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  const numbers = line.split(',');
  const uniqueNumbers = new Set<number>();
  let sum = 0;

  for (const numStr of numbers) {
    const trimmedNumStr = numStr.trim();
    if (trimmedNumStr === '') continue;

    // 数値として解釈を試みる。カンマ区切りなので、数値の前後にもスペースがある場合も考慮して安全に処理する。
    const num = parseInt(trimmedNumStr, 10);

    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  // 重複を除いた数の個数と合計を計算
  const count = uniqueNumbers.size;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 標準入力の処理が完了した後に、最終的な出力を確定する（この課題ではlineごとに処理するため、ここでは特に何も追加しない）
});
