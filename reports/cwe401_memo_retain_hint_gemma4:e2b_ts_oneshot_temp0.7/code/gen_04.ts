const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;
let lineNumber = 0;

rl.on('line', (line) => {
  if (lineNumber === 0) {
    // 最初の行から整数を読み始める
    let num = parseInt(line.trim(), 10);
    while (isNaN(num) || num < 1) {
      lineNumber++;
      if (rl.unreadLine) {
        // 次の行があれば読み飛ばす
        rl.once('line', (nextLine) => {
          // 読み飛ばし
        });
      } else {
        // 入力が終了した場合は終了
        rl.close();
      }
      if (!rl.unreadLine) break;
      num = parseInt(rl.line.trim(), 10);
    }
    
    if (isNaN(num) || num < 1) {
      // 有効な整数でなかった場合は無視し続ける
      return;
    }

    // 最初のクエリとして処理
    let n = num;
    let steps = 0;
    
    // メモ化された値が存在しない限り計算を開始
    if (!memo.has(n)) {
      let currentN = n;
      const path: number[] = []; // 計算過程を記録するため
      let count = 0;
      
      while (currentN !== 1) {
        if (memo.has(currentN)) {
          // メモから値を引き継ぐ
          count += memo.get(currentN);
          break;
        }
        
        if (currentN === 1) {
          count += 0;
          break;
        }

        // 置き換えルール適用
        if (currentN % 2 === 0) {
          currentN /= 2;
        } else {
          currentN = 3 * currentN + 1;
        }
        path.push(currentN);
        count++;
      }
      
      // 計算結果をメモ化
      // 経路を遡って、各ステップでの手数を計算してメモ化する
      // ただし、これは効率が悪いので、より直接的に手数を計算する
      
      // 再帰的メモ化（または動的計画法）がより適切だが、ここでは反復計算とメモ化を併用する。
      // 実際の問題は「1に到達するまでの手数」なので、現在のnから1へのパスの長さを求める。
      
      // 再帰的メモ化（DP）で再計算する方がシンプルで安全
      let steps_n = 0;
      let stack = [n];
      const visited = new Set<number>();
      
      while (stack.length > 0) {
        const current = stack.pop()!;
        if (current === 1) {
          // このパスでの手数を計算するために、再帰的なメモ化を適用する
          // ここでは単純なBFS/DFSで到達時間を求める。
          // メモ化を適用するためには、到達時間を格納する必要がある。
          
          // 簡略化のため、ここでは再帰的なメモ化を直接行う
          // ただし、再帰関数を定義し直す必要があるため、ここではメインループを修正する。
          
          // 暫定的に、再帰関数でメモ化を試みる
          const result = calculateSteps(n);
          memo.set(n, result);
          totalCount += result;
          
        } else if (visited.has(current)) {
          continue;
        }
        
        visited.add(current);

        // 次のステップを探索
        let nextN: number;
        if (current % 2 === 0) {
          nextN = current / 2;
        } else {
          nextN = 3 * current + 1;
        }
        
        if (nextN >= 1) {
          stack.push(nextN);
        }
      }
      
    } else {
      // メモがあればその値を使う
      totalCount += memo.get(n)!;
    }

    lineNumber++;
  }
});

// 再帰的メモ化関数
function calculateSteps(n: number): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let steps = 0;
    let currentN = n;
    const history: number[] = [];

    // 探索を停止するための安全策（無限ループ対策）
    const MAX_ITERATIONS = 1000000; 
    
    while (currentN !== 1 && history.length < MAX_ITERATIONS) {
        if (memo.has(currentN)) {
            // 既に計算済みの値に到達した場合、その結果を反映させる
            steps += memo.get(currentN)!;
            break;
        }
        
        if (currentN % 2 === 0) {
            currentN /= 2;
        } else {
            currentN = 3 * currentN + 1;
        }
        
        steps++;
        history.push(currentN);
    }
    
    if (currentN === 1) {
        // 1に到達した場合、現在のステップ数と、途中のメモ化結果を合計する
        // これは、(n -> ... -> 1) のパスの長さを求める問題であり、
        // 途中の値をメモ化するのではなく、直接到達時間を求める必要がある。
        
        // 再帰的なメモ化の定義を再考: f(n) = 1 + f(n/2 if even) または f(3n+1 if odd)
        // この問題は、遷移のたびにコストが1なので、最短経路探索（BFS）またはDPが適切。
        
        // ここでは、単純にDPとして実装し、メモ化を適用する。
        // 遷移が常に一方向（または非一方向）になるため、DPで十分。
        
        // 再度、DPとして実装し直す。
        
        // 既存のループを破棄し、DP構造を再構築する。
        return 0; // 実際にはこの関数は呼び出し側で処理する
    }
    
    // 探索がタイムアウトした場合（非常に大きな値になる可能性があるが、通常は収束するはず）
    // 実際には、この問題は「nを1にする操作を繰り返す」という定義であり、
    // 遷移のコストを考慮した最短経路問題となる。
    
    // 最終的な実装は、入力が1行ずつ来ることを想定し、各行に対してDPを適用する形にする。
    return -1; // エラーまたは未処理
}

// 最終的な処理：再帰的なメモ化を伴うDPを適用する
function solve() {
    const inputLines = [];
    rl.on('line', (line) => {
        inputLines.push(line);
    });

    rl.on('close', () => {
        let total = 0;
        const finalMemo = new Map<number, number>();
        
        // 各行をクエリとして処理
        for (const line of inputLines) {
            const n = parseInt(line.trim(), 10);
            if (isNaN(n) || n < 1) continue;

            if (n === 1) {
                total += 0;
                continue;
            }

            // DP/メモ化による計算
            const result = calculateStepsDP(n, finalMemo);
            total += result;
        }

        console.log(`total=${total}`);
    });
}

// DP関数：nから1への手数を計算し、メモ化する
function calculateStepsDP(n: number, memo: Map<number, number>): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    // 遷移のコストを考慮したDP
    let result = Infinity;

    // 1. nが偶数の場合: n/2
    if (n % 2 === 0) {
        const nextN = n / 2;
        const subResult = calculateStepsDP(nextN, memo);
        if (subResult !== Infinity) {
            result = Math.min(result, 1 + subResult);
        }
    } 
    // 2. nが奇数の場合: 3n+1
    else {
        const nextN = 3 * n + 1;
        const subResult = calculateStepsDP(nextN, memo);
        if (subResult !== Infinity) {
            result = Math.min(result, 1 + subResult);
        }
    }
    
    // 注意: この問題は「操作を繰り返す」ため、遷移が一方的（n -> f(n)）であり、
    // 通常の最短経路探索（BFS）ではなく、単一のパスの長さを求める。
    // 遷移が常に一方向なので、再帰的なメモ化で十分。
    
    if (result === Infinity) {
        // 到達不可能（ここでは発生しないはずだが、安全のため）
        return Infinity;
    }

    memo.set(n, result);
    return result;
}

// 実行
solve();
