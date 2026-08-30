const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を数値に変換する
  const numbers = line.split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => {
      const num = parseInt(s, 10);
      if (!isNaN(num)) return num;
      return NaN;
    })
    .filter(n => !isNaN(n));

  // 要素数と最大値を計算する
  const count = numbers.length;
  let maxValue = -Infinity;

  if (count > 0) {
    for (const num of numbers) {
      if (num > maxValue) {
        maxValue = num;
      }
    }
  } else {
    // 要素が一つもなかった場合の最大値の処理。仕様上は空入力の挙動に依存するが、ここでは安全のため0とするか、あるいは最大値が存在しないことを考慮する。
    // 整数列が空の場合、要素数は0、最大値は定義できない。ここでは、もし入力があった場合にのみ計算を行うという前提で進める。
    // 空の文字列やカンマのみの入力があった場合も、count=0 max=-Infinityとなる。
    maxValue = -Infinity; // 空のリストに対する実質的な最大値を表現
  }

  // 結果を出力する
  console.log(`count=${count} max=${maxValue}`);
});

rl.on('close', () => {
  // 処理が完了したことを示す（この問題ではreadlineのlineイベントで即座に出力するため、ここでは特に何もしない）
});
