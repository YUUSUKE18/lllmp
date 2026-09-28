const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let numbers: number[] = [];
  for (const part of parts) {
    const num = parseInt(part.trim(), 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  if (numbers.length > 0) {
    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));
    const count = uniqueNumbers.length;
    const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

    // 指定された形式で出力
    console.log(`count=${count} sum=${sum}`);
  } else {
    // 入力があったが有効な整数がなかった場合（空行や無効な入力のみ）は何も出力しないか、仕様に合わせて処理する。
    // ここでは何も出力しないことで対応する。
  }

  rl.close();
});
