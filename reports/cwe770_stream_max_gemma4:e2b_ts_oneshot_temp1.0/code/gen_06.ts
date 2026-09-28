const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  // カンマで分割し、各要素を整数に変換
  const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
  const intNumbers = [];

  for (const s of numbers) {
    const num = parseInt(s, 10);
    // 整数として解釈でき、かつ64bit範囲内であるかを確認（ここではNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      intNumbers.push(num);
    }
  }

  const count = intNumbers.length;
  let maxValue = -Infinity;

  if (count > 0) {
    // 最大値を求める
    for (const num of intNumbers) {
      if (num > maxValue) {
        maxValue = num;
      }
    }
  } else {
    // 要素が一つもなかった場合、最大値は定義できない（ここでは0とするか、または仕様に従って処理を決定する必要があるが、入力がない場合はcount=0 max=-Infinityとなる）
    // 整数列がない場合の挙動について、もし空のリストに対する最大値を求めるならば問題となる。
    // 入力が与えられた場合、少なくとも1つの値があればmaxを設定する。0個の場合は最大値は設定しない、または定義に従う。
    // ここでは、入力された有効な整数が存在しない場合は、count=0, max=-Infinityとする。ただし、制約から正の整数が想定されるため、空の場合は安全のため0として扱うか、特別な指示がない限り-Infinityを保持する。
    maxValue = -Infinity; // または 0 など、文脈によるがここでは最大値が存在しないことを示す
  }

  // 厳密に "count=<個数> max=<最大値>" を出力する
  console.log(`count=${count} max=${maxValue}`);
});
