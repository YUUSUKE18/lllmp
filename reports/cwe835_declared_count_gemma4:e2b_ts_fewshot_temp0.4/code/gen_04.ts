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

    // 整数として解釈でき、かつ64bit整数に収まるかを確認 (ここではparseIntの範囲で十分と仮定)
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      actualCount++;
      sum += num;
    }
  }

  console.log(`count=${actualCount} sum=${sum}`);
});
