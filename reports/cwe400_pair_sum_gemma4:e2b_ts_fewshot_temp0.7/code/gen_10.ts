const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  if (lines.length === 0) {
    console.log('pairs=0');
    return;
  }

  // 1行目が目標値
  const target = BigInt(lines[0]);

  // 2行目以降の整数を抽出
  const numbers: BigInt[] = [];
  for (let i = 1; i < lines.length; i++) {
    const numStr = lines[i];
    if (numStr) {
      const num = BigInt(numStr);
      numbers.push(num);
    }
  }

  let pairCount = 0;

  // 2個の組の個数を求める
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      if (sum === target) {
        pairCount++;
      }
    }
  }

  // 結果を出力
  console.log(`pairs=${pairCount}`);
});
