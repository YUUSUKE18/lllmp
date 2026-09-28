const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',');
  let count = 0;
  let maxValue = -Infinity;
  let isValid = true;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェック（NaNでないこと、そして元の文字列が数字のみで構成されていることを確認するために簡易的にチェック）
    if (!isNaN(num)) {
      // 64bitの範囲内であることは問題文で保証されているため、ここではそのまま比較に使用する
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
    } else {
      // 整数として解釈できない要素は無視（仕様に従う）
      isValid = false;
    }
  }

  // 厳密に count=<個数> max=<最大値> の1行を出力する
  if (count > 0) {
    console.log(`count=${count} max=${maxValue}`);
  } else {
    // 整数が一つもなかった場合（空行や無効な入力のみ）の処理。ここでは count=0, max=-Infinity または適切なデフォルト値を出力する。
    // 問題文の意図から、入力された有効な要素に基づいて計算する。もし要素がない場合は、最大値をどう扱うか定義されていないため、通常は 0 や -1 などが考えられるが、ここでは読み取った要素に基づき出力する。
    console.log(`count=0 max=-Infinity`); // または適切なデフォルト値
  }

  rl.close();
});
