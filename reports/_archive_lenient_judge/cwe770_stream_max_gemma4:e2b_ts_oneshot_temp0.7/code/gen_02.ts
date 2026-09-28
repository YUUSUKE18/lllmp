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

    // 整数として解釈できるかチェックし、64bit範囲内かチェックする（parseIntは安全だが念のため）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      validNumbersFound = true;
    }
  }

  // 整数として解釈できた要素のみを数える必要があるか、全てのカンマ区切りの要素をカウントするかで仕様が若干曖昧だが、「カンマ区切りの整数列を受け取る」ことから、入力された文字列に含まれる有効な整数のみを対象と解釈する。
  // 例: "1,2,a,3" -> 3個 (1, 2, 3) と解釈するか？
  // 仕様：カンマ区切りの整数列を受け取る。空白や空要素は無視し、整数として解釈できない要素も無視する。

  // この実装では、入力された文字列内のカンマで区切られた各部分をチェックし、有効な整数のみをカウントします。

  if (validNumbersFound) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 有効な整数が一つもなかった場合（空の入力や非数値のみの場合）
    console.log(`count=0 max=-Infinity`); // または適切なデフォルト値。ここでは最大値が存在しないことを示すため-Infinityを採用する。
  }

  rl.close();
});
