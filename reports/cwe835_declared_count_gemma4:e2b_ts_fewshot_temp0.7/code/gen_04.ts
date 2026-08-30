const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let linesRead = 0;
let count = 0;
let sum = 0;

rl.on('line', (line) => {
  if (linesRead === 0) {
    // 1行目: 整数個数
    const numCount = parseInt(line.trim(), 10);
    if (!isNaN(numCount)) {
      count = numCount;
    } else {
      // 1行目が不正な場合は処理を終了しない（仕様上は1行目が整数であると仮定）
    }
    linesRead++;
    return;
  }

  // 2行目以降: 整数
  const num = parseInt(line.trim(), 10);
  if (!isNaN(num)) {
    sum += num;
  }
  linesRead++;
});

rl.on('close', () => {
  console.log(`count=${count} sum=${sum}`);
});
