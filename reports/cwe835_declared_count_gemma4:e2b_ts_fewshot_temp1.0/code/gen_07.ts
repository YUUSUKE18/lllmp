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
    // 1行目: 続く整数の個数
    count = parseInt(line.trim(), 10);
  } else {
    // 2行目以降: 整数
    const num = BigInt(line.trim());
    if (Number.isInteger(Number(num)) && line.trim() !== "") {
      lines.push(line.trim());
      sum += num;
    }
  }
});

rl.on('close', () => {
  // 実際に読み取れた整数のみを対象とする (lines配列に含まれるもの)
  // ただし、問題の指示に従い、1行目の値と実際の読み取り数が一致しない可能性があるため、
  // 読み取れた行の数を count とする。
  const actualCount = lines.length;
  console.log(`count=${actualCount} sum=${sum.toString()}`);
});
