const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineCount = 0;

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  if (lines.length === 0) return;

  // 1行目: 目標値
  const target = parseInt(lines[0], 10);
  if (isNaN(target)) return;

  // 2行目以降: 整数
  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  const n = numbers.length;
  let pairCount = 0;

  // 2個の組の数を求める (i != j の条件を満たすペア)
  // 2つの数 a_i と a_j が a_i + a_j = target を満たす必要がある。
  // 実際には、与えられた整数列の中から、足して目標値になる2つの数を選ぶ、という問題と解釈する。
  // 問題文: 「2行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数を求めます。」
  // これは、配列 numbers の中で、numbers[i] + numbers[j] = target (i != j) となるペアの数を数えることを意味する。

  // 重複を許さないペアの数を数える（順序を考慮しないが、位置が異なる必要があるため、インデックスでのペアを数える）
  // もし numbers[i] と numbers[j] を選ぶとき、i != j が必要。
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  // 結果の出力
  console.log(`pairs=${pairCount}`);
});
