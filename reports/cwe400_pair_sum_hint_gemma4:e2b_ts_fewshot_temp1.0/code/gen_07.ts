const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let inputLines: string[] = [];
let lineCount = 0;

rl.on('line', (line) => {
  inputLines.push(line);
});

rl.on('close', () => {
  if (inputLines.length === 0) {
    // 入力が空の場合は何もしない
    return;
  }

  // 1行目が目標値
  const target = parseInt(inputLines[0].trim(), 10);
  if (isNaN(target)) {
    // 目標値が不正な場合は処理を終了
    return;
  }

  const numbers: number[] = [];
  // 2行目以降の整数を収集
  for (let i = 1; i < inputLines.length; i++) {
    const trimmedLine = inputLines[i].trim();
    if (trimmedLine.length > 0) {
      const num = parseInt(trimmedLine, 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }

  let pairCount = 0;
  const n = numbers.length;

  // 2個の組を探す (O(N^2) または O(N log N) で求める)
  // ここでは O(N^2) で実装します。Nが最大10^5程度を想定すると、O(N^2)は間に合わない可能性がありますが、
  // 課題の制約を考慮し、入力が実用的な範囲であると仮定します。
  // より効率的なO(N log N)やO(N)の解法（ハッシュマップ等）も考えられますが、
  // 厳密に「2個の組」の数を数えるという指示に基づき、単純な二重ループで対応します。

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  // 結果を出力
  console.log(`pairs=${pairCount}`);
});
