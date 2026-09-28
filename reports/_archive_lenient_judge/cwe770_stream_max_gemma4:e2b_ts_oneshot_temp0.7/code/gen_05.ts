const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let validNumbers = [];

  for (const part of parts) {
    const num = parseInt(part.trim(), 10);
    if (!isNaN(num)) {
      // 値が64bit整数範囲内であるか確認（JavaScriptのNumber型は標準でIEEE 754倍精度であり、安全な整数表現には限界があるが、ここでは入力された数値として処理する）
      validNumbers.push(num);
    }
  }

  if (validNumbers.length > 0) {
    count = validNumbers.length;
    max = Math.max(...validNumbers);
  } else {
    // 有効な整数が一つもなかった場合、count=0, maxの扱いは仕様に依存するが、ここでは少なくとも0を出力
    count = 0;
    // 最大値は定義されないため、ここでは便宜的に0や-Infinityを扱うが、問題文の意図に従い有効な要素がない場合は何らかの値を設定する必要がある。
    // 今回は「要素数と最大値」を求めるので、要素がない場合はcount=0, max=?となるが、入力された数値のみを対象とするため、空の場合はmaxも定義されないケースを考慮し、例えば最大値を-1や0とするか、あるいは単に count=0 のみを出力する。
    // 念のため、有効な数値が存在しない場合は、仕様に従いcount=0, max=（ここでは入力された範囲外の特別な値は指定されていないため）として扱う。
  }

  console.log(`count=${count} max=${max}`);
});

rl.on('close', () => {
  // 処理が完了したことを示す（このケースではreadlineが自動的に終了する）
});
