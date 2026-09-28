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
  let total_steps: bigint = 0n;
  const memo: Map<number, bigint> = new Map();

  /**
   * 斐波那契数列的な操作をメモ化して実行する関数
   * @param n 初期値
   * @returns 1 に到達するまでの手数
   */
  function calculate_steps(n: number): bigint {
    if (n === 1) {
      return 0n;
    }
    if (memo.has(n)) {
      return memo.get(n)!;
    }

    let current_n = n;
    let steps = 0n;

    while (current_n !== 1) {
      if (current_n % 2 === 0) {
        current_n /= 2;
      } else {
        current_n = 3 * current_n + 1;
      }
      steps++;
    }

    memo.set(n, steps);
    return steps;
  }

  for (const line of inputLines) {
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (!isNaN(n) && n >= 1) {
      const steps = calculate_steps(n);
      total_steps += steps;
    }
  }

  console.log(`total=${total_steps.toString()}`);
});
