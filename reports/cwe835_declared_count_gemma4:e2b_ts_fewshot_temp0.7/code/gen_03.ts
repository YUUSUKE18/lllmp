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
    // 1行目: 読み取った整数個数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      count = num;
    }
    return;
  }

  // 2行目以降: 整数
  const num = parseInt(line.trim(), 10);
  if (!isNaN(num)) {
    // 実際に読み取れた整数のみを対象とする
    sum += BigInt(num);
  }
});

rl.on('close', () => {
  // 実際に読み取れた個数と合計を出力
  console.log(`count=${count} sum=${sum.toString()}`);
});
