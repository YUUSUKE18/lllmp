const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let input = '';

rl.on('line', (line) => {
  input += line + '\n';
});

rl.on('close', () => {
  // 入力文字列を処理
  const parts = input.trim().split(',');

  let count = 0;
  let max = -Infinity;
  let isValidInput = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = Number(trimmedPart);

    // 整数として解釈可能で、64bit範囲内か確認
    if (!isNaN(num) && isFinite(num) && num >= Number.MIN_SAFE_INTEGER && num <= Number.MAX_SAFE_INTEGER) {
      count++;
      if (num > max) {
        max = num;
      }
      isValidInput = true;
    }
  }

  // 処理結果を出力
  // カンマ区切りで渡された要素数を数えるのではなく、有効な整数のみをカウントする。
  // 仕様の解釈として、「カンマ区切りのリスト」に含まれる整数要素の総数と最大値を求めるものとする。
  console.log(`count=${count} max=${max}`);
});
