import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = '';

rl.on('line', (line) => {
  input += line + '\n';
});

rl.on('close', () => {
  // 入力を処理
  const parts = input.trim().split(',');

  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    // 空文字や空白を無視する（split(',')で区切られた要素を評価）
    const trimmedPart = part.trim();
    if (trimmedPart === '') continue;

    // 整数として解釈できるか確認
    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      validCount++;
      // 64bit整数の範囲に収まることを前提とするため、標準のNumber型で比較する。
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 結果を出力
  console.log(`count=${validCount} max=${maxValue}`);
});
