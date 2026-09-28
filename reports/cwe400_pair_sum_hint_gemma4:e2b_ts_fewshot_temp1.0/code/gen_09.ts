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
    // 入力が空の場合は何も出力しない
    return;
  }

  // 1行目が目標値
  const target = BigInt(lines[0]);

  // 2行目以降の整数を抽出
  const numbers: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const numStr = lines[i];
    if (numStr.length > 0) {
      try {
        numbers.push(BigInt(numStr));
      } catch (e) {
        // 整数として解釈できない行は無視
      }
    }
  }

  let count = 0;
  const n = numbers.length;

  // 2個の組を探す
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const sum = numbers[i] + numbers[j];
      if (sum === target) {
        count++;
      }
    }
  }

  // 結果を出力
  console.log(`pairs=${count}`);
});
