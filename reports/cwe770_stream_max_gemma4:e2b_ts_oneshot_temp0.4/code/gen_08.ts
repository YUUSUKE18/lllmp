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
  let validNumbersFound = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が数字のみで構成されていることを確認するため、ここでは単純に数値変換の成功を重視する）
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      validNumbersFound = true;
    }
  }

  // 整数として解釈できた要素のみをカウントし、最大値を求める。
  // 仕様では「カンマ区切りの整数列を受け取る」とあるため、入力された文字列全体から数値を抽出する。
  // ここでの解釈は、「入力されたカンマ区切りの値のうち、有効な整数として解釈できるものをすべてカウントし、その最大値を求める」とする。

  if (validNumbersFound) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 有効な整数が一つもなかった場合（空の入力や非数値のみの場合）
    console.log(`count=0 max=-Infinity`); // または、問題の意図に応じて適切な値を出力。ここでは-Infinityを採用する。
  }

  rl.close();
});
