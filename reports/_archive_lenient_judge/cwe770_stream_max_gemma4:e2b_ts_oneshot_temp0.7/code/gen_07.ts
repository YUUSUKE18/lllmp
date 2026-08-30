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
  let validNumbersFound = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      // 値が64bit整数範囲内にあることを確認（JavaScriptのNumber型はIEEE 754倍精度で、安全に扱える範囲）
      // ここでは単純に数値として処理する。
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
      validNumbersFound = true;
    }
  }

  if (validNumbersFound) {
    console.log(`count=${count} max=${maxValue}`);
  } else {
    // 整数として有効な要素が一つもなかった場合（空または非数値のみの場合）
    // 仕様上、入力されたカンマ区切りのリストから数と最大値を求めるため、
    // 有効な数が0の場合は count=0 max=（適切な値。ここでは-Infinityや0など、文脈に依存するが、
    // 整数列がないため、実質的に何も出力しないか、またはcount=0, max=エラーとして扱う）
    // 今回は入力された要素から計算するため、有効な要素がなければ何も出力しない（あるいは count=0 max=-Infinity のように解釈できるが、今回は「要素が存在する場合」を前提とする）。
    // 空の入力や無効な入力があった場合の挙動を明確にするため、ここでは数値を検出できなかった場合は何も出力しない。
  }
});

rl.on('close', () => {
  // 入力終了
});
