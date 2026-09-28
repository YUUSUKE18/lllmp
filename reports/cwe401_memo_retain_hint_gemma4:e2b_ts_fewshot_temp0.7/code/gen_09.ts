const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;

rl.on('line', (line) => {
  if (line.trim() === '') return;
  
  const n = parseInt(line.trim(), 10);
  if (isNaN(n)) return;

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const count = memo.get(n)!;
    total_count += count;
    return;
  }

  // 終了条件
  if (n === 1) {
    memo.set(1, 0);
    total_count += 0;
    return;
  }

  // 再帰的計算とメモ化
  if (n % 2 === 0) {
    // nが偶数なら n/2
    const next_n = n / 2;
    const steps = 1 + memo.get(next_n)!;
    memo.set(n, steps);
  } else {
    // nが奇数なら 3n+1
    const next_n = 3 * n + 1;
    const steps = 1 + memo.get(next_n)!;
    memo.set(n, steps);
  }
  
  // この処理は実際には再帰的に呼び出すことになりますが、
  // 1に到達するまでの手数を求めるため、ここでは直接的な計算を試みます。
  // 実際には、nから1へのパスを追跡する必要があります。
  // ここでは、与えられた操作のみを適用して1に到達するまでのステップ数を計算します。
  
  // 再度、nから1へのパスを追跡する計算ロジックを適用します。
  // 課題の要求は「nが1に到達するまでの手数を求める」ことです。
  // 既存のメモ化ロジックは、操作が「nからn/2または3n+1」という形で与えられていることを前提としています。
  // 課題の操作は「nが偶数なら n/2、奇数なら 3n+1に置き換える操作を繰り返し」です。
  // これは通常、Collatz推移問題として知られています。

  // Collatz推移のメモ化を再構築します。
  // 1に到達するまでの手数を求めるため、再帰的なメモ化で十分です。
  
  // 再帰的な関数で計算し、結果をメモ化します。
  const calculate_steps = (start: number): number => {
    if (start === 1) {
      return 0;
    }
    if (memo.has(start)) {
      return memo.get(start)!;
    }

    let steps = 0;
    let current = start;
    const path = new Set<number>(); // サイクルの検出用

    while (current !== 1) {
      if (path.has(current)) {
        // サイクルに入った場合、計算は停止（ただし、問題の制約上、Collatz推移は1に収束すると仮定されるため、これは通常発生しない）
        // 厳密には、サイクル内の移動は無限ループを避けるために考慮が必要だが、ここでは1に収束すると仮定して進める。
        // 敵対的な入力に対しても実用的な時間を求めるため、サイクル検出は必須。
        // ただし、今回は「1に到達するまでの手数」なので、サイクルに入ったら無限ループと見なすか、
        // 1に到達しない場合はエラーとするべきだが、問題の文脈上、1に収束すると期待される。
        // ここでは、一般的なCollatz推移のメモ化に従い、サイクル検出を導入します。
        throw new Error(`Cycle detected starting from ${start}`);
      }
      
      path.add(current);
      
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }

    // 1に到達した場合、パス上のすべての値のメモ化を更新
    let result = 0;
    let temp = start;
    while (temp !== 1) {
        if (memo.has(temp)) {
            result += memo.get(temp)!;
            break; // 1に到達した場合は、そこまでの合計を計算
        }
        // 1に到達するまでのパスを計算し、メモ化
        if (temp === 1) break;
        
        if (temp % 2 === 0) {
            const next_n = temp / 2;
            // 再帰的に計算を呼び出す（これにより依存関係が解決される）
            const sub_steps = calculate_steps(next_n);
            memo.set(temp, 1 + sub_steps);
            result += (1 + sub_steps);
            break;
        } else {
            const next_n = 3 * temp + 1;
            // 再帰的に計算を呼び出す
            const sub_steps = calculate_steps(next_n);
            memo.set(temp, 1 + sub_steps);
            result += (1 + sub_steps);
            break;
        }
    }
    
    // 最終的な結果を返す（この構造は複雑すぎるため、簡略化してトップレベルの処理に絞る）
    // 実際には、入力された各nに対して個別に計算し、その結果を合計する必要があります。
    return 0; // この関数はトップレベルの処理で呼び出されることを想定し、ここでは無視
  };

  // --- 簡略化された処理：各行に対して独立して計算し、結果を合計する ---
  
  let current_n = n;
  let steps_to_one = 0;
  const path_for_n = new Map<number, number>(); // nから1へのパスを追跡し、メモ化を達成するため

  while (current_n !== 1) {
    if (memo.has(current_n)) {
      steps_to_one += memo.get(current_n)!;
      break;
    }
    
    if (path_for_n.has(current_n)) {
        // サイクル検出（Collatz推移では通常発生しないが、安全のため）
        // サイクルに入った場合は、この入力に対する計算を中止するか、エラーとする
        break;
    }

    path_for_n.set(current_n, steps_to_one);
    
    if (current_n % 2 === 0) {
      current_n = current_n / 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    steps_to_one++;
  }
  
  // 1に到達した後のステップ数を、メモに格納し、合計に加算
  if (current_n === 1) {
      // 1に到達するまでのステップ数を計算し、メモに保存
      // path_for_nに記録されているのは、そのノードから1へのパスの長さではないため、
      // 最終的なステップ数のみを計算する必要がある。
      
      // 追跡したパスを逆順に辿って、実際のステップ数を計算し直す
      let actual_steps = 0;
      let temp = n;
      while (temp !== 1) {
          if (temp % 2 === 0) {
              temp /= 2;
          } else {
              temp = 3 * temp + 1;
          }
          actual_steps++;
      }
      
      // 最終的な結果をメモに追加（メモ化の目的を達成するため）
      memo.set(n, actual_steps);
      total_count += actual_steps;
  }
});

rl.on('end', () => {
  // 最終結果を出力
  console.log(`total=${total_count}`);
});
