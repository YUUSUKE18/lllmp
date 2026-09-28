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

  const uniqueNumbers = [...new Set(numbers)];
  const count = uniqueNumbers.length;
  // 合計は64bit整数として扱うため、BigIntまたは標準のNumberで計算する。
  // 仕様上「合計は 64bit 整数の範囲に収まる」とあるので、標準のNumber（53bit精度）でも十分だが、念のため安全のためには大きな数が必要な場合に考慮する。
  // ここでは通常の数値として処理し、問題の制約に従う。
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 入力が終了した後の処理は不要だが、readlineの設計上ここで終了する。
});
