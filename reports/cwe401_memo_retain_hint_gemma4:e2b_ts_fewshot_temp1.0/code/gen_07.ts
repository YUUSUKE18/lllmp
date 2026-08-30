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
    // 手数は 0
    total_count += 0;
  } else if (!memo.has(n)) {
    let steps = 0;
    let current = n;
    
    // 3n+1 問題の解法 (Collatz conjecture)
    while (current !== 1) {
      if (memo.has(current)) {
        // メモ化された値から再計算を継続
        steps += memo.get(current);
        current = 1; // 終了
        break;
      }
      
      let next;
      if (current % 2 === 0) {
        next = current / 2;
      } else {
        next = 3 * current + 1;
      }
      
      steps++;
      current = next;
    }
    
    // 1に到達した後のステップ数をメモ化
    // この問題の要求は「1 に到達するまでの手数」なので、再帰的または反復的に計算し、メモ化する。
    // ここでは、元のnから1に到達するまでのステップ数を計算する。
    
    // メモ化戦略の修正: 
    // memo[n] = nから1に到達するまでのステップ数
    
    let temp_steps = 0;
    let current_n = n;
    const path: number[] = [];

    while (current_n !== 1) {
        if (memo.has(current_n)) {
            temp_steps += memo.get(current_n);
            break;
        }
        path.push(current_n);
        
        if (current_n % 2 === 0) {
            current_n /= 2;
        } else {
            current_n = 3 * current_n + 1;
        }
        temp_steps++;
    }
    
    // 1に到達するまでの正確なステップ数を計算し、メモ化する
    // ここでは、Memoizationを使って計算を高速化する。
    // ただし、最終的な合計を求めるため、各クエリに対して再帰的または反復的に計算し、
    // その結果を合計する方が安全。

    // 再計算とメモ化を組み合わせる (DP的なアプローチ)
    
    let current_steps = 0;
    let current_val = n;
    const history: number[] = [];
    
    // 1に到達するまでのパスを追跡
    while (current_val !== 1) {
        // 既に計算済みの値があればそこから足し算する
        if (memo.has(current_val)) {
            current_steps += memo.get(current_val);
            break;
        }
        history.push(current_val);

        if (current_val % 2 === 0) {
            current_val /= 2;
        } else {
            current_val = 3 * current_val + 1;
        }
        current_steps++;
    }
    
    // パスを遡ってメモ化を更新する
    for (let i = history.length - 1; i >= 0; i--) {
        const val = history[i];
        // valから1に到達するまでのステップ数は、valの次の要素(history[i+1])からのステップ数 + 1
        if (i + 1 < history.length) {
            // このアプローチは複雑すぎるため、単純なDPとして再構築する。
            // 最初にnから1までのパスを計算し、その過程でメモ化する。
        }
    }

    // シンプルなDP計算でメモ化を適用する (最も安全な方法)
    const stack: { val: number, steps: number }[] = [];
    stack.push({ val: n, steps: 0 });
    const visited = new Set<number>();
    visited.add(n);

    while (stack.length > 0) {
        const { val, steps } = stack.pop()!;
        
        if (val === 1) {
            total_count += steps;
            continue;
        }
        
        if (memo.has(val)) {
            // すでに計算済みの場合はその結果を利用して合計に加算
            total_count += memo.get(val);
            continue;
        }

        if (val > 1000000000) { // 32bit/64bitの範囲を考慮し、無限ループを防ぐための安全策（ここでは実際には1に収束するため不要だが、より大きな数に対する対策）
            // 実際のCollatz予想に基づけば、収束すると仮定する。
        }
        
        let next: number;
        if (val % 2 === 0) {
            next = val / 2;
        } else {
            next = 3 * val + 1;
        }
        
        // スタックにプッシュする前に、もし次の値が既に計算済みなら、その結果を利用して現在のステップ数を計算する
        if (memo.has(next)) {
            const next_steps = memo.get(next);
            memo.set(val, steps + 1 + next_steps);
        } else {
            stack.push({ val: next, steps: steps + 1 });
        }
    }
    
    // 最終的な合計を求めるには、全てのnに対する計算が必要になるため、
    // 読み込み時に計算を完了させる。
    
  } else {
    // すでに計算済みの場合はメモ化された値を加算する
    total_count += memo.get(n);
  }
});

rl.on('end', () => {
  // 最終的な合計を出力
  console.log(`total=${total_count}`);
});
