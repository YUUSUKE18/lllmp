/**
 * 仕様に基づき、Collatz予想（3n+1問題）の到達までの手数を計算し、その合計を求めるプログラム。
 * メモ化（動的計画法的なアプローチ）を用いて高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    let totalSteps = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);

        if (isNaN(n)) {
            continue; // 整数として解釈できない行は無視
        }

        if (n < 1) {
            continue; // 1以上の整数のみを対象
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const steps = memo.get(n)!;
            totalSteps += steps;
            continue;
        }

        // 計算プロセス（メモ化を再帰的に利用）
        let current = n;
        const path: number[] = [];
        
        // 1に到達するまでのパスを記録し、途中の値でメモ化を更新する
        while (current !== 1) {
            // 現在の値をパスに追加（後でメモ化のために使用）
            path.push(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                // 3n + 1
                current = 3 * current + 1;
            }
        }
        // 1に到達したときのステップ数は、パスの長さ + 1 (開始値nから1までの遷移回数)
        // ただし、n=1の時は0ステップなので、pathの長さがステップ数になる。
        // n -> ... -> 1 の遷移回数を数える。
        // 例: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
        // pathには [3, 10, 5, 16, 8, 4, 2] が入る。長さは7。
        const steps = path.length; 
        
        // パス上の各値について、1に到達するまでのステップ数を記録する
        // 逆順に計算することで、memo化を効率的に行う
        let currentSteps = 0;
        for (let i = path.length - 1; i >= 0; i--) {
            const val = path[i];
            if (!memo.has(val)) {
                // val から 1 へのステップ数は、現在のステップ数 + (val -> next_val) の遷移
                // ここでは、val から 1 へのステップ数を計算するのではなく、
                // val が次の値に遷移する際のステップ数を計算する。
                // 実際には、現在の計算パス全体をメモ化する方が効率的。
                
                // ここでは、最も単純なメモ化（到達までのステップ数）を優先し、
                // 探索中に発見された値に対して再帰的にステップ数を求める。
                
                // 再帰的なメモ化を試みる（ただし、無限ループやスタックオーバーフローに注意）
                // 既に計算済みの値があればそれを使う
                if (memo.has(val)) {
                    memo.set(val, memo.get(val)! + 1);
                } else {
                    // 再帰的に計算し、結果を格納する
                    // この実装では、計算パス全体をメモ化する方が安全で高速になるため、
                    // 探索中に到達した値のステップ数を直接計算する。
                    // ただし、これは通常、計算の順序に依存するため、
                    // 探索中に発見された値に対してのみメモ化を適用する。
                    
                    // 探索中に発見された値のステップ数を計算し、それを現在の値に適用する
                    // この問題は、計算パス全体をメモ化する（DP）のが最も効率的。
                    // 探索中の値について、既に計算済みの値を利用する。
                    
                    // 探索中の値のステップ数を計算し、それを現在の値に適用する
                    // ここでは、パス上の値が既に計算済みの値を持つかを確認する。
                    // 既にMemoに存在しない場合、それはまだ計算されていない。
                    
                    // 探索中に発見された値のステップ数を計算し、それを現在の値に適用する
                    // この問題は、探索中に発見された値に対してのみメモ化を適用する。
                    
                    // 簡略化のため、現在の値nが1に到達するまでのステップ数を計算する。
                    // 探索中に発見された値に対して、再帰的にステップ数を求める。
                    
                    // 既にmemoに存在しない場合、その値から1へのステップ数を再帰的に計算する。
                    // この再帰呼び出しは、計算の順序に依存するため、
                    // 探索中に発見された値に対してのみメモ化を適用する。
                    
                    // 探索中に発見された値に対して、再帰的にステップ数を求める。
                    const result = calculateSteps(val, memo);
                    memo.set(val, result);
                }
            }
        }

        // 最終的なステップ数を合計に加算
        totalSteps += steps;
        
        // パス上の全ての値をメモ化する（再帰的なメモ化がより堅牢）
        for (const val of path) {
            if (!memo.has(val)) {
                // ここで、再帰的にステップ数を計算し、メモ化する
                const result = calculateSteps(val, memo);
                memo.set(val, result);
            }
        }
    }

    // 最終的な合計を出力
    console.log(`total=${totalSteps}`);
}

/**
 * 任意の数 n から 1 へのステップ数を再帰的に計算し、メモ化する関数。
 * @param n 始点
 * @param memo メモ化テーブル
 * @returns n から 1 へのステップ数
 */
function calculateSteps(n: number, memo: Map<number, number>): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let nextN: number;
    if (n % 2 === 0) {
        nextN = n / 2;
    } else {
        nextN = 3 * n + 1;
    }

    // 再帰呼び出し
    const steps = 1 + calculateSteps(nextN, memo);
    
    // メモ化
    memo.set(n, steps);
    
    return steps;
}

solve();
