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
  let maxValue = -Infinity;
  let validNumbersFound = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈でき、かつ64bit範囲内（安全のため）のチェック
    if (!isNaN(num) && Number.isSafeInteger(num)) {
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
    // 数値が一つもなかった場合（空の入力や非数値のみの場合）
    // 仕様上、入力があった場合は何らかの結果を出力すべきだが、
    // 今回は有効な整数が見つからなかった場合の振る舞いを明記されていないため、
    // 0個と最小値(-Infinity)または適切なエラー表示になるが、ここではデータが存在しないと解釈し何も出力しないか、あるいは0を返す。
    // 最も安全なのは、入力されたものから抽出できた数のみを報告すること。
    // 今回は「要素数」と「最大値」を求めるため、有効な数が0個の場合、count=0, max=?となる。
    // 64bit範囲の最小値を基準にするため、データが存在しない場合は何もしない（または0, -1など）が、
    // 例に従い、存在するデータに基づいて計算する。ここでは、入力されたものから抽出できた有効な数に基づき出力する。
  }
});

rl.on('close', () => {
  // 標準入力が終了した後に処理が完了する
});
