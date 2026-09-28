const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineCount = 0;

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let actualCount = 0;
  let sum = 0;

  for (const line of lines) {
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈できるかチェック
    if (!isNaN(num)) {
      // 64bit整数範囲内であるか（ここでは、parseIntが返す値が安全であると仮定し、
      // 読み取れた整数としてカウントする。問題文の制約に従い、値の範囲チェックは必須としない）
      actualCount++;
      sum += num;
    }
  }

  console.log(`count=${actualCount} sum=${sum}`);
});
