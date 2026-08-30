const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let count = 0;
  let sum = 0;

  for (const line of lines) {
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈可能かチェック
    if (!isNaN(num) && String(num) === line) {
      // 実際に読み取れた整数のみを対象とする
      count++;
      sum += num;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
