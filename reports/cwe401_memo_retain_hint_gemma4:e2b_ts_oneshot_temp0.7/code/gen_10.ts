let memo: Map<number, number> = new Map();
let total_count = 0;

process.stdin.on("data", (data: Buffer) => {
  const input = data.toString().trim();
  if (input === "") return;

  const n = parseInt(input, 10);
  if (Number.isNaN(n) || n < 1) return;

  if (n === 1) {
    // 1に到達するまでの手数は0
    // この場合、n=1のクエリは1回で処理を終える
    // ただし、問題文の「nが1のときの手数は0です」という指示をどう解釈するか。
    // ここでは、n=1の入力があった場合、その手数を0としてカウントし、
    // その後の操作は行わない（または、計算結果を0とする）と解釈する。
    // 問題文は「nが1のときの手数は0です」とあり、操作を繰り返す過程の手数。
    // 1から始まるため、n=1の入力は計算終了。
    memo.set(1, 0);
    total_count += 0;
    return;
  }

  // 再帰的な計算とメモ化
  let steps = 0;
  let current = n;
  const path: number[] = [];

  while (current !== 1) {
    if (memo.has(current)) {
      steps += memo.get(current);
      break;
    }

    path.push(current);
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  if (current === 1) {
    // 1に到達したときのステップ数を計算し、メモ化する
    // 既に計算中の途中でメモ化されている値があればそれを利用する
    let total_path_steps = 0;
    let temp = n;
    
    // 再計算してパスを辿る（メモ化が不完全な場合や、パスの長さを直接求める場合）
    // ここでは、より効率的に、パスを辿りながらメモ化を更新するアプローチを採用する。

    let current_calc = n;
    let count = 0;
    const path_trace: number[] = [];
    
    while (current_calc !== 1) {
        if (memo.has(current_calc)) {
            count += memo.get(current_calc);
            break;
        }
        path_trace.push(current_calc);
        if (current_calc % 2 === 0) {
            current_calc /= 2;
        } else {
            current_calc = 3 * current_calc + 1;
        }
        count++;
    }

    if (current_calc === 1) {
        // 1に到達した際のステップ数を計算し、パス全体をメモ化する
        // ここでの「手数」は、nから1に到達するまでの操作回数。
        // 1に到達するまでに費やした操作回数を計算する。
        
        // 実際には、nから1に到達するまでの操作回数を求める。
        // 1のときの手数は0。
        // n=5: 5 -> 16 (1) -> 8 (2) -> 4 (3) -> 2 (4) -> 1 (5). 手数=5.
        
        let final_steps = 0;
        let temp_n = n;
        
        while (temp_n !== 1) {
            if (memo.has(temp_n)) {
                final_steps += memo.get(temp_n);
                break;
            }
            
            if (temp_n % 2 === 0) {
                temp_n /= 2;
            } else {
                temp_n = 3 * temp_n + 1;
            }
            final_steps++;
        }
        
        memo.set(n, final_steps);
        total_count += final_steps;
    }
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total_count}`);
});
