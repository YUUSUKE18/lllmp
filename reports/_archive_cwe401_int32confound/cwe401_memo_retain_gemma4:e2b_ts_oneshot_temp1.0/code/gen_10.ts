const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const stack: Map<number, number> = new Map();
let total_steps = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;
  const n = parseInt(line.trim(), 10);
  if (Number.isNaN(n) || n < 1) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    // ただし、この問題は n から 1 への到達時間を問うため、
    // 1からスタートすると 0ステップで終了。
    // 入力が n からスタートする場合、n=1 の場合は既に終了しているので 0 ステップ。
    // 仕様に従い、nが1のときの手数は0とする。
    total_steps += 0;
    return;
  }

  if (!stack.has(n)) {
    const steps: number[] = [n];
    let current = n;
    let count = 0;

    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps.push(current);
      count++;
    }
    // 1 に到達するまでの手数は steps.length - 1 (最初の n を含めると n-1)
    // n=1 のとき、(1) -> 0ステップ
    // n=2 のとき、2 -> 1 (1ステップ)
    // n=3 のとき、3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
    // 実際は、操作を繰り返す回数なので、現在のリストの長さから 1 を引くか、
    // 1 に到達するまでに実行した操作回数が必要。
    // 1 に到達するまでに必要な操作回数 = steps.length - 1 (ただし、steps[0] = n)
    
    // ここでは、n からスタートし、1 に到達するまでの操作回数をカウントする。
    // 1 に到達した時点での操作回数 (count) を記録する。
    total_steps += count;
    
    // メモ化 (ここでは、計算過程のメモ化が必要だが、最終結果の合計を求めるため、
    // 各 n に対するステップ数を直接計算して加算する方式を採用する)
    // スタックに保存するのは、もし再帰的に計算する場合のためのメモ化。
    // 今回は入力ごとに計算するので、スタックへの保存は不要だが、
    // 「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化」の要求を満たすため、
    // 内部計算でメモ化を行う（ここでは外部のMapを利用する）。
    
    // n をスタックに追加する（メモ化の要求を満たすため）
    // 実際は、この問題は一般的なメモ化問題（Collatz Conjecture）であり、
    // 入力nごとに計算して合計を求める形式。
    
    // 再計算の高速化のために、この関数をメモ化する形にする。
    stack.set(n, count);
  }
});
