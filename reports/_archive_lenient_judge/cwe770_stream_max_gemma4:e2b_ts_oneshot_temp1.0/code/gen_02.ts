const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let input = '';

rl.on('line', (line) => {
  input += line + '\n';
});

rl.on('close', () => {
  // 入力を一行で処理する（ここではストリーム全体を待つ形にする）
  const lines = input.trim().split(/\s*,\s*/).filter(s => s.length > 0);

  if (lines.length === 0) {
    console.log("count=0 max=0");
    return;
  }

  let count = 0;
  let max = -Infinity;

  for (const line of lines) {
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 最大値が初期化されていない場合（入力がすべて無効な値だった場合、仕様に従い処理）
  if (count === 0) {
      console.log("count=0 max=0");
  } else {
      // maxが-Infinityの場合（これは発生しないはずだが念のため）、あるいは正しく計算された場合
      console.log(`count=${count} max=${max}`);
  }
});
