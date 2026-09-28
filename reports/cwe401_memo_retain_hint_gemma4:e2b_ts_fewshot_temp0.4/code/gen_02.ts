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
    // n=1 の場合の手数は 0
    const steps = 0;
    total_steps += steps;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const steps = memo.get(n)!;
    total_steps += steps;
    return;
  }

  // 再帰または反復計算
  let current_n = n;
  let steps = 0;
  const history = new Set<number>(); // サイクル検出用

  while (current_n !== 1) {
    if (history.has(current_n)) {
      // サイクルに陥った場合、現在のステップ数を計算して終了
      // サイクル内のステップ数を考慮する必要があるが、ここでは単純化のため、
      // サイクル検出時にステップ数を追跡する方がより正確。
      // ただし、この問題は通常、3n+1問題のサイクル検出が重要。
      // ここでは、サイクル検出時にステップ数を追跡するロジックを導入する。
      // 簡略化のため、ここでは一般的な3n+1問題のサイクル検出を適用する。
      break; // サイクル検出ロジックを後で修正または再評価する
    }
    history.add(current_n);

    if (current_n % 2 === 0) {
      current_n = current_n / 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    steps++;
  }

  // サイクル検出とメモ化のロジックを再構築する（3n+1問題の標準的な最適化）
  // 3n+1問題では、nが1に到達するまでのステップ数を求める。
  // サイクル検出は、nが同じ値に戻るかどうかをチェックする。
  // サイクル検出を正確に行うため、再帰的なメモ化とサイクル検出を組み合わせる。

  // -----------------------------------------------------------------
  // 再計算：メモ化とサイクル検出を統合した、より堅牢な実装
  // -----------------------------------------------------------------

  const calculate_steps = (start_n: number): number => {
    const path = new Map<number, number>(); // 値 -> ステップ数
    let current = start_n;
    let step = 0;

    while (current !== 1) {
      if (path.has(current)) {
        // サイクル検出: 既に訪れた値に戻った場合
        const cycle_start_step = path.get(current)!;
        const cycle_length = step - cycle_start_step;
        // サイクル内のステップ数を計算
        const steps_to_target = step - cycle_start_step; // サイクル内の移動数
        // サイクルを抜けた後の移動数を計算
        const remaining_steps = (1 - current) === 0 ? 0 : 1; // 1に到達したと仮定して、サイクルからの残りステップを計算する必要があるが、ここでは単純にサイクルを無視して終了する。
        // 3n+1問題では、サイクルに陥ったら、そのサイクルが1を含まない限り、到達不可能または特殊なケースとなる。
        // しかし、この問題では1に到達することを前提としているため、サイクル検出は「到達までの最短経路」を求めるために使用する。
        // サイクルに陥った場合、そのサイクルが1に到達する経路に含まれるかを確認する必要がある。
        // 3n+1問題では、通常、1に到達する経路を探索する。
        // サイクル検出は、到達経路の長さの計算に役立つ。
        // ここでは、サイクルに陥った場合は、その経路が1に到達する経路の一部であるとみなし、サイクルを無視して計算を続ける。
        // もしサイクルが1を含まない場合、到達不可能となるが、問題の制約から1に到達すると仮定する。
        // サイクル検出は、到達までのステップ数を正確に計算するために重要。
        return Infinity; // サイクルに陥った場合は、ここでは到達不可能と見なす（実質的に無限ループを避ける）
      }

      path.set(current, step);

      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      step++;
    }

    // 1に到達した場合
    return step;
  };

  // 最終的な計算とメモ化
  const result_steps = calculate_steps(n);
  if (result_steps !== Infinity) {
    memo.set(n, result_steps);
    total_steps += result_steps;
  }
});

rl.on('end', () => {
  // 最終結果を出力
  console.log(`total=${total_steps}`);
});
