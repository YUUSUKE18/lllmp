const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換しようと試みる
  const parts = line.split(',');
  let numbers: number[] = [];

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;
    const num = parseInt(trimmedPart, 10);
    // 整数として解釈でき、かつNaNでないことを確認
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  // 合計は64bit整数に収まるため、標準のNumber型で十分だが、念のためBigIntや安全な方法も考慮する。
  // ここでは問題の制約に従い、通常の数値計算で進める。
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 標準入力の処理が完了したことを示す（この問題ではlineイベントで直接出力するため、ここでは特に何もしない）
});
