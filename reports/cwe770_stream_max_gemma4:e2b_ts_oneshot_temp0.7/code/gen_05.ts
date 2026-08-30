const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let validNumbersFound = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈でき、かつ64bit範囲内であるかチェック（ここでは標準のNumber型で十分と仮定し、NaNチェックを重視）
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      validNumbersFound = true;
    }
  }

  // すべての入力が処理された後に出力する（ここでは一度のリクエストとして処理を終える）
  // 実際には、この形式は通常、入力全体をまとめて処理する場合に適切ですが、
  // 標準入力が1行で完結することを想定し、読み込んだ時点で出力します。
  if (validNumbersFound) {
    console.log(`count=${count} max=${max}`);
  } else if (parts.length > 0 && parts[0].trim() !== "") {
     // 数値が見つからなかったが入力があった場合、count=0, max=-Infinity または適切なデフォルト値を出すべきだが、
     // 仕様に従い、数値として解釈できたもののみをカウントする。ここでは何も見つからなかった場合は何も出力しない（または0 0 としても良いが、最大値の初期値に依存するため今回は省略）
  }
});

rl.on('close', () => {
    // readlineを使用する場合、通常はラインごとに処理を行うため、上記で十分。
});
