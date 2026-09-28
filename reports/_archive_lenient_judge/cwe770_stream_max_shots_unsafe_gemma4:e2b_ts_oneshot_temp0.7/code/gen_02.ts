import * as process from "process";

function solve() {
  const input = process.stdin.readSync();
  if (!input) return;

  // カンマで分割し、空白や空文字列をフィルタリングして整数に変換する
  const numbers = input.split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => {
      const num = parseInt(s, 10);
      return isNaN(num) ? NaN : num;
    })
    .filter(n => !isNaN(n));

  if (numbers.length === 0) {
    process.stdout.write("count=0 max=0\n");
    return;
  }

  // 要素数を計算する
  const count = numbers.length;

  // 最大値を計算する
  let maxVal = -Infinity;
  for (const num of numbers) {
    if (num > maxVal) {
      maxVal = num;
    }
  }

  // 結果を出力する
  process.stdout.write(`count=${count} max=${maxVal}\n`);
}

solve();
