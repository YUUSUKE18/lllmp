const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let count: number = 0;
let sum: bigint = 0n;

rl.on('line', (line) => {
  if (lines.length === 0) {
    // 1行目: 読み取れた整数の個数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      count = num;
    }
  } else {
    // 2行目以降: 整数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      sum += BigInt(num);
    }
  }
  lines.push(line);
});

rl.on('close', () => {
  // 読み取れた整数のみを対象とするため、countは1行目で読み取った値を使用する
  // sumは実際に読み取れた整数のみの合計
  console.log(`count=${count} sum=${sum.toString()}`);
});
