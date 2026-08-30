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

  // 1行目は目標値
  const target = parseInt(lines[0], 10);
  if (isNaN(target)) {
    console.log('pairs=0');
    return;
  }

  // 2行目以降の整数を抽出
  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  if (numbers.length < 2) {
    console.log('pairs=0');
    return;
  }

  let pairCount = 0;
  const n = numbers.length;

  // 2つの組の個数を求める (O(N^2) は許容されると仮定。より効率的な方法を検討するが、制約がないためまず試行)
  // 問題文の「2 個の組（位置が異なる 2 個）の個数を求めます」は、
  // (numbers[i] + numbers[j] == target) となる (i != j) のペアの数を求めることを意味する。

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  console.log(`pairs=${pairCount}`);
});
