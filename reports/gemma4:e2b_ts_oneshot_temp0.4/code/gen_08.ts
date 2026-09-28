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
  const integers: number[] = [];
  for (const s of numbers) {
    const num = parseInt(s, 10);
    if (!isNaN(num)) {
      integers.push(num);
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = Array.from(new Set(integers));

  // 個数と合計を計算する
  const count = uniqueNumbers.length;
  // 合計は64bit整数に収まる前提だが、JavaScriptのNumber型で十分
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  // 結果を出力する
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 標準入力が終了したときの処理（この問題ではlineイベントで出力するため、ここでは特に何もしない）
});
