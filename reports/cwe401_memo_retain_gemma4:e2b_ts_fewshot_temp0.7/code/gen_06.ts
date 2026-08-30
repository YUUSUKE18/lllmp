const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_steps = 0;
let line_count = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    const steps = 0;
    total_steps += steps;
    line_count++;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const steps = memo.get(n)!;
    total_steps += steps;
    line_count++;
    return;
  }

  // 再帰的計算とメモ化 (または反復計算)
  let current_n = n;
  let steps = 0;
  const path: number[] = [];

  while (current_n !== 1) {
    path.push(current_n);
    if (current_n % 2 === 0) {
      current_n = current_n / 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    steps++;
  }

  // 1に到達したときのステップ数を計算（経路の長さ）
  // この問題は、n -> 1 に到達するまでの操作回数を求める問題であるため、
  // 経路上のステップ数を数える。
  // ただし、問題文の意図を「nが1になるまでの操作回数」と解釈し、
  // 経路上のステップ数を数える。
  // 1に到達するまでの操作回数は、このループで計算された steps に等しい。
  
  // 経路の各ステップで合計を更新するのではなく、nから1へのパスの長さを求める。
  // memo化は、nから1への最短経路長を求めることを意味する。
  
  // 再計算を避けるため、再帰的なメモ化（または動的計画法）を適用する。
  // ただし、この問題は「nが1になるまでの手数」を求めているため、
  // 1からnへの逆操作を考えるのが一般的だが、ここでは与えられた操作に従う。

  // DP/メモ化の再定義: f(n) = n -> 1 に到達するまでの手数
  // f(1) = 0
  // f(n) = 1 + f(n/2) if n is even
  // f(n) = 1 + f(3n+1) if n is odd

  // 逆操作で考えると、これは非常に複雑になるため、与えられた操作をそのまま辿る。
  // ただし、この問題は「手数を求める」という点が重要であり、
  // 経路上の操作回数を数えるのが自然である。

  // 経路上の操作回数を求める (n -> 1)
  // 1に到達するまでの操作回数を求める。
  
  // 経路上の要素を記録し、その要素が1になるまでの操作回数を記録する。
  let current_n_for_steps = n;
  let steps_to_one = 0;
  const history: number[] = [n]; // n自身も記録
  
  while (current_n_for_steps !== 1) {
    if (current_n_for_steps % 2 === 0) {
      current_n_for_steps /= 2;
    } else {
      current_n_for_steps = 3 * current_n_for_steps + 1;
    }
    steps_to_one++;
    history.push(current_n_for_steps);
  }
  
  // 1に到達するまでの手数は steps_to_one
  total_steps += steps_to_one;
  
  // メモ化
  memo.set(n, steps_to_one);
  line_count++;
});

rl.on('end', () => {
  // 最終結果の出力
  console.log(`total=${total_steps}`);
});
