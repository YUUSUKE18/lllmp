const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',');
  let numbers: number[] = [];

  for (const part of parts) {
    const num = parseInt(part.trim(), 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  // BigIntを使用することで、64bitの範囲を超える可能性に対応可能にするが、問題文では「64bit整数の範囲に収まる」とあるため、通常のNumberで十分なケースが多い。しかし安全のため、合計はNumberまたはBigIntで扱う。ここでは標準的な数値として計算する。
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);

  rl.close();
});
