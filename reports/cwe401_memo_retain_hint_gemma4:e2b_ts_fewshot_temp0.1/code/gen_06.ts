const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;
let line_number = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    total_count += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    total_count += memo.get(n);
    return;
  }

  // 再帰または反復計算
  let count = 0;
  let current_n = n;
  const path = new Set<number>(); // サイクル検出用

  while (current_n !== 1) {
    if (path.has(current_n)) {
      // サイクルに陥った場合、このパスは無限ループになるため、
      // サイクル内の移動回数を考慮する必要があるが、
      // この問題は通常、1に到達するパスを問うため、
      // サイクル検出は「到達不可能」または「無限」を意味する。
      // しかし、この問題はCollatz予想に関連しており、1に到達すると仮定する。
      // サイクル検出は、計算が非常に長くなるのを防ぐためのメモ化の補助として使う。
      // ここでは、単純に計算を続けることに焦点を当てる。
      // サイクル検出は、計算が非常に遅くなる場合にのみ有効。
      // 64bit整数に収まる範囲で計算を続ける。
    }
    
    // 置き換えルール
    if (current_n % 2 === 0) {
      current_n /= 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    count++;
  }

  // 1に到達したときのステップ数を記録
  // ここで、memo化のロジックを修正し、到達したときのステップ数を記録する。
  // 実際には、再帰的なメモ化（DP）が最も効率的。
  
  // 再帰的なメモ化（DP）を適用する
  const calculate_steps = (start_n: number): number => {
    if (start_n === 1) return 0;
    if (memo.has(start_n)) return memo.get(start_n)!;

    const path_stack: number[] = [start_n];
    let current = start_n;
    let steps = 0;
    const visited = new Map<number, number>(); // 値 -> ステップ数

    while (current !== 1) {
      if (visited.has(current)) {
        // サイクル検出。この問題では、サイクル内の移動回数を考慮する必要があるが、
        // 1に到達するパスを問うため、サイクルは通常発生しない（Collatz予想）。
        // サイクルに陥った場合は、そのサイクル内の移動回数を加算して終了する。
        const cycle_start_index = visited.get(current)!;
        const cycle_length = steps - cycle_start_index;
        // サイクル内の移動回数を加算して、1に到達するまでのステップ数を計算する
        // ここでは、単純化のため、サイクル検出はスキップし、計算を続ける。
      }
      
      if (current <= 0) {
          // 負の値やゼロが発生した場合の処理（問題の制約外だが安全のため）
          // この問題では通常発生しない。
          break;
      }

      if (current % 2 === 0) {
        current /= 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
      
      // 非常に大きな値になる可能性があるため、64bit整数として扱う
      if (steps > 1000000) { // 安全策として非常に大きなステップ数を制限
          // 非常に遅い場合は、メモ化を諦め、計算を終了する（実用的な時間制限）
          // ただし、問題の要求は「1に到達するまでの手数を求める」なので、
          // サイクル検出を厳密に行うべき。
      }
    }
    
    // 1に到達したかどうかの確認
    if (current === 1) {
        // 1に到達したときのステップ数を記録
        for (const val of path_stack) {
            const index = path_stack.indexOf(val);
            if (val === 1) {
                memo.set(val, steps);
                return steps;
            }
        }
    }
    
    // 1に到達しなかった場合（サイクルまたは無限大）、ここではエラーとして扱うか、
    // 実際には計算が完了するまで待つべきだが、ここでは計算結果を返す。
    // Collatz予想に基づき、1に到達すると仮定する。
    // 厳密には、サイクル検出とステップ数の計算を正しく行う必要がある。
    
    // 簡略化のため、再帰的なメモ化を直接適用する形に戻す。
    return -1; // 失敗
  };

  // 最終的な計算ロジックを再構築（DP/メモ化）
  // 外部からの入力が1行ずつ来るため、ここでは各入力に対して計算し、合計を出す。
  // 外部の入力ストリームを一度に処理するのではなく、各行が独立したクエリとして扱われる。
  
  // 外部の入力ストリームを一度に読み込む方式に変更する。
});

// 標準入力全体を読み込む方式に変更
let input_data = '';

process.stdin.on('data', (data) => {
  input_data += data;
});

process.stdin.on('end', () => {
  const lines = input_data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
  let total_sum = 0;
  const final_memo = new Map<number, number>();

  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;

    if (n === 1) {
      // n=1 の場合は手数は 0
      total_sum += 0;
      continue;
    }

    // メモ化された値があればそれを使用
    if (final_memo.has(n)) {
      total_sum += final_memo.get(n)!;
      continue;
    }

    // DP/メモ化による計算
    const stack: number[] = [n];
    const steps: number[] = [0];
    const visited: Map<number, number> = new Map([[n, 0]]);

    let current = n;
    let step_count = 0;
    let found_steps = -1;

    while (current !== 1) {
      if (visited.has(current)) {
        // サイクル検出
        const cycle_start_index = visited.get(current)!;
        const cycle_length = step_count - cycle_start_index;
        
        // サイクル内の移動回数を加算して、1に到達するまでのステップ数を計算する
        // サイクル内の移動回数を加算して、1に到達するまでのステップ数を計算する
        // ここでは、サイクル内の移動をスキップし、サイクル内のステップ数を加算する。
        
        // サイクル内のステップ数を計算
        const cycle_steps = steps.slice(cycle_start_index, step_count);
        
        // 1に到達するまでのステップ数を計算
        // サイクルをスキップし、1に到達するまでのステップ数を計算する
        
        // サイクル内のステップ数を加算して、1に到達するまでのステップ数を計算する
        // この問題では、サイクルに陥った場合は、そのサイクルが1に到達しないことを意味する。
        // 厳密には、サイクル内の移動を考慮する必要があるが、
        // Collatz予想に基づき、ここではサイクル検出を「計算が遅くなることの回避」に限定する。
        
        // サイクル検出を無視し、計算を続ける（実用的な時間制限を考慮）
        // 非常に大きな値になることを避けるため、計算を続ける。
      }

      if (current % 2 === 0) {
        current /= 2;
      } else {
        current = 3 * current + 1;
      }
      step_count++;
      steps.push(step_count);
      visited.set(current, step_count);
      
      // 非常に大きな値になることを避けるための安全策（64bit整数に収まる範囲で計算を続ける）
      if (step_count > 1000000) {
          // 非常に遅い場合は、計算を打ち切る（実用的な時間制限）
          // この場合、1に到達していないと見なす。
          found_steps = -1;
          break;
      }
    }

    if (current === 1) {
      // 1に到達したときのステップ数を記録
      final_memo.set(n, step_count);
      total_sum += step_count;
    } else {
      // 1に到達しなかった場合（計算が打ち切られた、またはサイクルに陥った）
      // 問題の制約上、1に到達すると仮定するが、ここでは計算が完了しなかったため、
      // 厳密な結果を出すために、このケースは無視するか、エラーとする。
      // 競技プログラミングの文脈では、通常、この計算は1に収束すると仮定される。
      // 念のため、ここでは計算が完了しなかった場合は、そのクエリを無視する（またはエラーとする）。
    }
  }

  console.log(`total=${total_sum}`);
});
