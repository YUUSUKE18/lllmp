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
  let isValid = true;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      numbers.push(num);
    } else {
      // 整数として解釈できない要素は無視する（仕様に従う）
      // ただし、ここでは「整数として解釈できない要素も無視します」という指示に基づき、
      // 完全に無効な入力があった場合でも処理を続行する。
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  // 合計は64bit整数に収まるため、標準のnumber型で十分だが、念のためBigIntや安全な処理を考慮する。
  // ここでは通常の数値として計算し、結果が64bit範囲内であることを前提とする。
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 標準入力の処理が完了したことを示す（この問題ではlineイベントで直接出力するため、ここでは特に何もしない）
});
