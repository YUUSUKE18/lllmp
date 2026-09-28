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

  if (isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    // この問題では、nがクエリとして与えられるので、n自体が現在の値と解釈し、
    // その値から1に到達するまでの手数を計算する。
    // ただし、問題文の記述「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
    // は、通常、Collatz予想に関連する操作を指します。
    // ここでは、与えられたnから1に到達するまでのステップ数を計算します。
    // n=1 のときの手数は 0。
    const steps = calculate_steps(n);
    total_steps += steps;
    return;
  }

  // n > 1 の場合、メモ化を使用して計算
  const steps = calculate_steps(n);
  total_steps += steps;
});

function calculate_steps(n: number): number {
  if (n === 1) {
    return 0;
  }
  if (memo.has(n)) {
    return memo.get(n)!;
  }

  let current = n;
  const steps = 0;

  while (current !== 1) {
    if (memo.has(current)) {
      // 途中経過でメモがあれば、その結果を足し合わせる
      const memo_steps = memo.get(current)!;
      steps += memo_steps;
      current = 1; // 1に到達したと仮定してループを抜ける
      break;
    }

    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  // 1に到達した後のステップ数をメモする
  // 注意: この問題は「nから1に到達するまでの手数を求める」という操作の回数を数える。
  // したがって、再帰的または反復的に現在の値が1になるまでのステップ数を数える必要がある。
  // ここでは、nから1に到達するまでのステップ数を直接計算する。
  
  // 再計算（メモ化のロジックを修正）
  let current_val = n;
  let count = 0;
  const path: number[] = [n];
  const visited = new Set<number>();
  visited.add(n);

  while (current_val !== 1) {
    if (memo.has(current_val)) {
        // 既に計算済みの値に到達した場合、メモを遡って加算する
        const memo_result = memo.get(current_val)!;
        // 既に計算済みの値から1までのステップ数を加算し、現在のパスのステップ数を確定させる
        count += memo_result;
        break;
    }
    
    if (current_val % 2 === 0) {
      current_val = current_val / 2;
    } else {
      current_val = 3 * current_val + 1;
    }
    count++;
    path.push(current_val);
    
    // 無限ループ防止（ただし、Collatz問題では通常1に収束すると仮定される）
    if (path.length > 100000) break; 
  }

  // 最終的な結果をメモする (nから1までのステップ数)
  // この実装では、再帰的なメモ化の構造を単純化するため、ここではnから1へのパスを直接計算する。
  // 厳密には、各クエリnに対する操作の回数を合計する必要がある。
  // 問題文の解釈を「nから1に到達するまでの操作回数」と「その合計」として進める。
  
  // 再度、単純な反復計算とメモ化を適用する。
  // 1からnまでのパスを計算し、メモ化する。
  
  let current_n = n;
  let steps_to_one = 0;
  const path_to_one: number[] = [n];
  const visited_path = new Set<number>([n]);

  while (current_n !== 1) {
    if (memo.has(current_n)) {
        // メモがあれば、その結果を足し合わせる
        steps_to_one += memo.get(current_n)!;
        break;
    }

    if (current_n % 2 === 0) {
      current_n /= 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    steps_to_one++;
    
    if (visited_path.has(current_n)) {
        // サイクル検出（通常は発生しないが、安全のため）
        break;
    }
    visited_path.add(current_n);
    path_to_one.push(current_n);
  }
  
  // 経路上の全ての値をメモに保存する（これは、他のクエリがこの経路を利用できるようにするため）
  // ただし、求められているのは「nから1への手数」の合計なので、nのみをメモするのが最も直接的。
  memo.set(n, steps_to_one);
  
  return steps_to_one;
}

// 読み込みが完了した後の処理
rl.on('end', () => {
  // 最終的な合計を出力
  console.log(`total=${total_steps}`);
});
