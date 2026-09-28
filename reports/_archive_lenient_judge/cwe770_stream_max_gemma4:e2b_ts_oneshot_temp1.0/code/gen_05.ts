const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換する
  const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
  
  let count = 0;
  let max = -Infinity;
  let hasNumbers = false;

  for (const numStr of numbers) {
    // 整数として解釈できるか確認（64bit整数範囲内を想定）
    const num = parseInt(numStr, 10);
    
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      hasNumbers = true;
    }
  }

  // 整数として解釈できた要素のみをカウントし、最大値を求める必要があるため、
  // 元の仕様（カンマ区切りの整数列を受け取る）に従い、入力された文字列全体から数値を抽出する。
  // ただし、今回の課題は「カンマ区切りの整数列」を読み込むので、ここでは単一の行として処理する。

  if (hasNumbers) {
    console.log(`count=${count} max=${max}`);
  } else if (numbers.length > 0) {
      // 数値として解釈できなかった要素が一つもなかった場合（例: "a,b"）、count=0 max=-Infinity となる。
      // 厳密には、整数として解釈できた要素のみを数えるべきだが、入力行全体を一つのデータセットとして扱うため、ここでは抽出できたもののみをカウントする。
      console.log(`count=0 max=-Infinity`); // または仕様に依存するが、今回は意味のある数値がない場合は0, -Infとするのが安全。
  } else {
     // 入力された行が空またはカンマのみの場合
     console.log(`count=0 max=-Infinity`);
  }

  rl.close();
});
