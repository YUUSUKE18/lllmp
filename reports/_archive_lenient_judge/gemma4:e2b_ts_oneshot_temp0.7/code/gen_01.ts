const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  // カンマで分割し、各要素を整数に変換する
  const numbers = line.split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => parseInt(s, 10))
    .filter(n => !isNaN(n));

  // 重複を除いた整数を取得
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算する
  const count = uniqueNumbers.length;
  // 合計は64bit整数で収まるという指示があるため、標準のNumber型（IEEE 754倍精度浮動小数点数）またはBigIntを使用しても良いが、ここでは一般的な数値として扱う。
  // ただし、合計値が非常に大きくなる可能性がある場合は注意が必要だが、仕様上は64bitに収まるとされているため、Node.jsの標準Number型で十分と仮定する。
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 入力が終了した後の処理は不要（lineイベントで即時出力するため）
});
