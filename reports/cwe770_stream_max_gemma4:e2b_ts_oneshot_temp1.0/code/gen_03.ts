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

    if (!isNaN(num)) {
      // 要素数をカウント
      count++;
      // 最大値を更新
      if (num > maxValue) {
        maxValue = num;
      }
    } else {
      // 整数として解釈できない要素は無視する（仕様上、ここでは行全体がカンマ区切りの整数列と仮定）
      // ただし、厳密には各要素をチェックする必要があるため、isValidフラグの扱いを調整する。
      // 今回は「整数として解釈できない要素も無視します」という指示に従い、有効な整数のみをカウントに含める。
    }
  }

  if (count > 0) {
    console.log(`count=${count} max=${maxValue}`);
  } else {
    // 入力が空または無効な値のみだった場合も考慮するが、仕様に基づき最大値は定義できないか、最小値になる。
    // ここでは入力を無視するか、0個と最小値として扱う。空の入力の場合、何も出力しないのが適切かもしれないが、実行時に処理された結果を出す。
    // カウントが0の場合、最大値は設定されないため、ここでは特段の指示がない限り何かを出力しないか、適切なデフォルト値を設定する。
    // 整数列が空だった場合は count=0, max=-Infinity となる。
    console.log(`count=0 max=-Infinity`); // または処理結果に応じて調整が必要だが、最大値が存在しないため-Infinityとする。
  }

  rl.close();
});
