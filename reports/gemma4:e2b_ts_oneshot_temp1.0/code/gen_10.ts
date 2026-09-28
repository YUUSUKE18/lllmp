const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let uniqueNumbers = new Set<number>();
  let totalSum = 0n; // 使用するためにBigIntで初期化（合計が64bit収まるためNumberでも可能だが安全のため）

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、Setに追加
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  // 重複を除いた数の個数を計算
  const count = uniqueNumbers.size;

  // 重複を除いた数の合計を計算
  let sum = 0n;
  for (const num of uniqueNumbers) {
    sum += BigInt(num);
  }

  // 結果を出力
  console.log(`count=${count} sum=${sum.toString()}`);
});

rl.on('close', () => {
  // このイベントはreadlineの環境では通常発生しないが、念のため
});
