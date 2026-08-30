const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalSum = 0;
let lineCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 手数は 0
    const currentResult = 0;
    if (!memo.has(n)) {
      memo.set(n, currentResult);
    }
    // この問題では、nが1に到達するまでの手数を求めるため、再帰的な計算をシミュレーションする
    // しかし、ここでは「nが1に到達するまでの手数」を求めるため、操作の逆を考えるか、直接シミュレーションする。
    // 課題の指示を再確認すると、「n が 1 に到達するまでの手数を求めます」となっている。
    // これは、nから操作を適用して1になるまでのステップ数を意味する。

    // ここでは、nから1になるまでのステップ数を求めるため、操作を逆向きに考えるか、
    // n -> 1 に到達するまでの過程をシミュレーションする。
    // 課題の操作は: nが偶数なら n/2、奇数なら 3n+1。これはコラッツ予想の操作。
    // コラッツ数列の定義に基づき、nから1に到達するまでのステップ数を求める。

    // 実際には、nから1に到達するまでのステップ数を求めるため、
    // 1からnに向かって操作を適用するのではなく、nから操作を適用して1になるまでを追跡する。
    // ただし、コラッツ数列の文脈では、通常はnから開始してn->operation(n)を繰り返す。
    // ここでは、nが1に到達するまでの手数を求めるため、nからスタートして1になるまでを数える。
    // もしnが1なら、操作は不要なので手数は0。
    
    if (n === 1) {
        // n=1 の場合は手数は 0
        if (!memo.has(1)) {
            memo.set(1, 0);
        }
    }
  } else {
    // n > 1 の場合、再帰的またはメモ化再帰で計算
    let steps = 0;
    let current = n;
    const history = new Set<number>();

    while (current !== 1) {
      if (memo.has(current)) {
        steps += memo.get(current);
        current = 1; // 既に1に到達したと仮定してループを抜ける
        break;
      }
      
      // サイクル検出のための履歴管理（無限ループ防止）
      if (history.has(current)) {
          // サイクルに落ちた場合は、この経路は計算不能または無限ループと見なす
          // しかし、問題文は「1に到達するまでの手数を求めます」なので、通常は収束すると仮定する。
          // サイクル検出は、同じ値が再び現れた場合、その経路の計算は停止させるべきだが、
          // 今回は単純にメモ化に頼る。
          break; 
      }
      
      history.add(current);
      
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }

    // 計算結果をメモ化
    if (current === 1) {
        // 1に到達したときのステップ数を保存
        if (!memo.has(n)) {
            memo.set(n, steps);
        }
    } else {
        // 1に到達しなかった（サイクルまたは計算不能）場合は、特殊な値（例: -1）を保存するか、無視する。
        // 問題文の制約から、すべてのクエリが1に収束すると仮定する。
        // 実際には、nが非常に大きくなる可能性があるため、このシミュレーションは深すぎる可能性がある。
        // 厳密には、nが1に到達するまでの「手数」を求めるため、
        // n -> op(n) -> op(op(n)) -> ... -> 1 となる過程のステップ数を数える必要がある。
        
        // 再度、手数の計算方法を「nから1に到達するまでのステップ数」として解釈し直す。
        // これは、nを操作して1になるまでの操作回数を意味する。
        
        // 簡略化のため、メモ化再帰で計算するアプローチを採用し、サイクル検出で対応する。
        // ここでは、nから1への経路を求めるため、メモ化再帰で再計算する。
        
        let result = calculateSteps(n);
        if (result !== Infinity) {
             if (!memo.has(n)) {
                 memo.set(n, result);
             }
             totalSum += result;
        }
    }
  }
  lineCount++;
});

function calculateSteps(n: number): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    // サイクル検出とメモ化
    const path = new Map<number, number>(); // 値 -> ステップ数
    let current = n;
    let steps = 0;
    
    while (current !== 1) {
        if (path.has(current)) {
            // サイクル検出。この経路は無限ループ。
            return Infinity;
        }
        path.set(current, steps);

        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }
    
    // 1に到達した場合、そのステップ数をメモ化
    memo.set(n, steps);
    return steps;
}

// 全ての行が読み終わった後の処理
rl.on('end', () => {
    // 読み込み中に計算が完了していれば、合計を出す
    // 実際には、lineイベント内で計算と合計を更新するように変更したため、ここでは確認のみ。
    console.log(`total=${totalSum}`);
});
