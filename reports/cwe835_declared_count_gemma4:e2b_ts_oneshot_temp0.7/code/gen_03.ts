const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let count: number | undefined = undefined;
let numbers: number[] = [];
let totalSum: bigint = 0n;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    return;
  }

  if (count === undefined) {
    // 1行目: 続く整数の個数
    const num = parseInt(trimmedLine, 10);
    if (!isNaN(num)) {
      count = num;
    }
  } else {
    // 2行目以降: 整数
    const num = parseInt(trimmedLine, 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }
});

rl.on('close', () => {
  // 実際に読み取れた整数のみを対象とするため、numbers配列を使用
  const actualCount = numbers.length;
  
  // 合計を計算 (64bit整数を扱うためBigIntを使用)
  const sum = numbers.reduce((acc, val) => acc + BigInt(val), 0n);

  // 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
  process.stdout.write(`count=${actualCount} sum=${sum}\n`);
});
