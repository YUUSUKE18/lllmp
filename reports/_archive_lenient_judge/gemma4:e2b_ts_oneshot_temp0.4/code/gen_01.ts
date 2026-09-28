const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換する
  const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
  const integerArray: number[] = [];

  for (const s of numbers) {
    const num = parseInt(s, 10);
    if (!isNaN(num)) {
      integerArray.push(num);
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = Array.from(new Set(integerArray));

  // 個数と合計を計算する
  const count = uniqueNumbers.length;
  // BigIntを使用しない場合、合計が64bitに収まることを前提とする（標準のNumber型で十分）
  let sum: number = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 標準入力が終了したときの処理（この問題ではlineイベントで即座に出力するため、ここでは特に何もしない）
});
