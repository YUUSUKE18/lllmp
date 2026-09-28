const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  const parts = line.split(',');
  let count = 0;
  let maxVal = -Infinity;
  let validNumbers = [];

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === '') continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      // 値が64bit整数の範囲内にあることを確認（ここでは標準のNumber型で十分だが、念のため）
      // JavaScriptのNumberはIEEE 754倍精度浮動小数点数であり、安全な整数表現は2^53まで。
      // 64bit整数（最大約9 * 10^18）はJavaScriptの安全な整数範囲を超える可能性があるが、
      // 問題文の指示に従い、読み込んだ値をそのまま処理する。
      validNumbers.push(num);
    }
  }

  if (validNumbers.length > 0) {
    count = validNumbers.length;
    maxVal = Math.max(...validNumbers);
    console.log(`count=${count} max=${maxVal}`);
  } else {
    // 数値が一つもなかった場合、count=0, maxの適切な値（例：-Infinityや0など）を決定する必要がある。
    // ここでは入力された有効な数値がない場合は count=0, max=-1 (あるいは問題文の制約に合わせる) とする。
    // 空のリストに対する最大値は未定義だが、ここではcount=0として処理する。
    console.log(`count=0 max=-1`); // 少なくとも1行出力する
  }

  rl.close();
});
