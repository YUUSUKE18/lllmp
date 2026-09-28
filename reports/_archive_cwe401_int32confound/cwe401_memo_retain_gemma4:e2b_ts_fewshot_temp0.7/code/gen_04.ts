const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let inputLines: string[] = [];
rl.on('line', (line) => {
  inputLines.push(line.trim());
});

rl.on('close', () => {
  let totalCount: number = 0;
  const memo = new Map<number, number>();

  for (const line of inputLines) {
    if (line === "") continue;

    let n = parseInt(line, 10);
    if (isNaN(n)) continue;

    if (n === 1) {
      totalCount += 0;
    } else if (!memo.has(n)) {
      let count = 0;
      let currentN = n;
      
      // 計算とメモ化
      while (currentN !== 1) {
        if (currentN % 2 === 0) {
          currentN /= 2;
        } else {
          currentN = 3 * currentN + 1;
        }
        count++;
      }
      memo.set(n, count);
    } else {
      totalCount += memo.get(n)!;
    }
  }

  console.log(`total=${totalCount}`);
});
