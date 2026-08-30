const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;
  const n = parseInt(line.trim(), 10);

  if (isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合の手数は 0
    const count = 0;
    total_count += count;
    // 1 の結果は既に memo にあるはずだが、念のため
    memo.set(1, 0);
    return;
  }

  if (memo.has(n)) {
    const count = memo.get(n)!;
    total_count += count;
    return;
  }

  // 繰り返し計算
  let steps = 0;
  let current = n;
  const path: number[] = [];

  while (current !== 1) {
    path.push(current);
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
  }
  // 1 に到達するまでの手数は path の長さ + 1 (最後のステップ)
  // または、n から 1 に到達するまでの操作回数。
  // 問題文の解釈: n が 1 のときの手数は 0。
  // n=3 の場合: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
  // 実際には、n から 1 に到達するまでの操作回数を数える。
  // 1 のときの手数は 0。
  // n=2: 2 -> 1 (1回)
  // n=3: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
  // 1 のときの手数は 0。
  // 1 から n に逆算するのではなく、n から 1 に到達するまでの操作回数を数える。

  // 再計算: n が 1 のときの手数は 0。
  // n=2: 2 -> 1 (1回)
  // n=3: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
  // 1 から n への操作を逆向きに考えるのは、Fibonacci数列の性質を利用する問題（Collatz conjecture）の逆問題。
  // ここでは、n から 1 に到達するまでの操作回数を求める。

  let steps_to_one = 0;
  let temp = n;
  while (temp !== 1) {
    if (temp % 2 === 0) {
      temp /= 2;
    } else {
      temp = 3 * temp + 1;
    }
    steps_to_one++;
  }

  const result = steps_to_one;
  memo.set(n, result);
  total_count += result;
});

rl.on('close', () => {
  console.log(`total=${total_count}`);
});
