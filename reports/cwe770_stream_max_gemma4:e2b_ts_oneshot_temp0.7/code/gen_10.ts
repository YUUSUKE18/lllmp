const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',').map(s => s.trim());

  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    if (part === "") continue;
    const num = parseInt(part, 10);
    
    // 整数として解釈でき、64bit整数範囲内かを確認（ここではNaNチェックと一般的な数値比較に焦点を当てる）
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 厳密に1行だけ出力
  console.log(`count=${count} max=${max}`);
  rl.close();
});
