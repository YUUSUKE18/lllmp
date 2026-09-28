let memo: Map<number, number> = new Map();
let total_steps: number = 0;

process.stdin.on("data", (c: Buffer) => {
  const line = c.toString().trim();
  if (line === "") return;

  const n = parseInt(line, 10);
  if (Number.isNaN(n) || n < 1) return;

  if (n === 1) {
    // 1に到達するまでの手数は0
    // このクエリ自体は合計に加算しないが、memo化のために記録しておく
    memo.set(1, 0);
    return;
  }

  // 再帰または反復でステップ数を計算し、メモ化を利用する
  let current_n = n;
  let steps = 0;
  const history: number[] = [];

  while (current_n !== 1) {
    if (memo.has(current_n)) {
      steps += memo.get(current_n);
      break;
    }
    
    history.push(current_n);

    if (current_n % 2 === 0) {
      current_n /= 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    steps++;
  }

  if (current_n === 1) {
    // 1に到達した場合、その経路のステップ数を計算し、メモ化する
    let current_steps = 0;
    let temp_n = n;
    
    // 経路を逆引きしてステップ数を計算する（より効率的）
    // ここでは、元の計算過程を辿ってステップ数を計算する方が、
    // どの分岐でメモ化が有効になるか判断しやすいが、
    // 課題の要求は「nが1になるまでの手数」なので、直接計算を優先する。

    // 再計算してステップ数を求める（メモ化の利用を最大化する）
    let current_val = n;
    let count = 0;
    const path: number[] = [n];

    while (current_val !== 1) {
      if (memo.has(current_val)) {
        count += memo.get(current_val);
        break;
      }
      
      if (current_val % 2 === 0) {
        current_val /= 2;
      } else {
        current_val = 3 * current_val + 1;
      }
      count++;
    }
    
    // 経路上のすべての値についてメモ化を更新する（DP的なアプローチ）
    // この問題は、各nから1への最短経路を求める問題であり、
    // 実際にはnが大きくなるため、直接再帰/メモ化で計算する方が自然。
    // ここでは、nから1へのパスを再帰的に計算し、memoを更新する方針で再構成する。
    
    // --- 再度、メモ化を再構成する ---
    
    // 1からnまでのパスを再計算してメモを更新する
    const path_memo: Map<number, number> = new Map();
    path_memo.set(1, 0);
    
    const stack: number[] = [n];
    const visited: Set<number> = new Set([n]);

    while(stack.length > 0) {
        const current = stack.pop()!;
        if (current === 1) continue;

        let next_val: number;
        if (current % 2 === 0) {
            next_val = current / 2;
        } else {
            next_val = 3 * current + 1;
        }

        if (next_val >= 1) {
             // 逆方向に辿るのではなく、nから1への最短経路を求めるため、
             // ここでは計算された経路を記録する
            if (!path_memo.has(next_val)) {
                path_memo.set(next_val, path_memo.get(current) + 1);
                stack.push(next_val);
            }
        }
    }
    
    // 最終的な合計を計算する
    const final_total = Array.from(path_memo.entries())
        .reduce((sum, [key, value]) => sum + value, 0);
        
    // このアプローチでは、各クエリnについて計算されたステップ数を合計するのではなく、
    // 記録されたすべての状態のステップ数を合計する必要がある。
    // 課題は「すべてのクエリの手数の合計」なので、各入力行に対して計算し、それを合計する。
    
    // 最初のクエリ n に対するステップ数を計算し、total_steps に加算する
    let calculated_steps = 0;
    let temp_n_calc = n;
    
    while (temp_n_calc !== 1) {
        if (memo.has(temp_n_calc)) {
            calculated_steps += memo.get(temp_n_calc);
            break;
        }
        
        if (temp_n_calc % 2 === 0) {
            temp_n_calc /= 2;
        } else {
            temp_n_calc = 3 * temp_n_calc + 1;
        }
    }
    
    // このロジックは、単一のクエリに対するステップ数を求める問題に近いため、
    // 「すべてのクエリの手数の合計」を求めるには、各入力に対して独立して計算し、合計する必要がある。
    // したがって、memo化は、同じ値が入力された場合の計算結果を保存するのに使用する。

    // 最終的な計算結果を total_steps に加算
    total_steps += calculated_steps;
    
    // 最終的な結果は出力後にまとめて行う
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total_steps}`);
});
