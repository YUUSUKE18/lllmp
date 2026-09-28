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

    // チェック: 整数として解釈できるか、かつ64bit範囲内か（ここではJSのNumber型で十分だが、仕様に従いチェック）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      validNumbersFound = true;
    }
  }

  // 処理が完了した時点で出力する（この問題では1行入力のみを想定）
  if (validNumbersFound) {
    console.log(`count=${count} max=${max}`);
  } else if (parts.length > 0 && parts.every(p => p.trim() === "")) {
    // 入力が空文字列や空白のみだった場合も考慮（このケースでは count=0 max=-Infinity となるが、仕様に厳密に従う）
    console.log(`count=0 max=-Infinity`);
  }
});

rl.on('close', () => {
  // 標準入力の処理は 'line' イベントで完結するため、ここでは特に何もしない。
});
