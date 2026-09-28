const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換しようとする
  const parts = line.split(',');
  let numbers: number[] = [];

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;
    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  // 合計は64bit整数で収まるため、標準のnumber型（IEEE 754 double precision）で十分だが、安全のためBigIntを使うことも考えられるが、ここでは通常の数値として扱う。
  // 問題文の制約「合計は 64bit 整数の範囲に収まります」に基づき、JavaScriptのNumber型（安全な整数範囲: 2^53 - 1）で計算する。
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 標準入力が終了したときの処理（この問題ではlineイベントで即時出力するため、ここでは特に何もしない）
});
