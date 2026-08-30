/**
 * 仕様を満たすプログラム
 * 
 * 課題：
 * 標準入力から与えられた整数 n に対して、
 * n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n=1 の場合は手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 
 * 入力形式：
 * 標準入力には、1以上の整数が1行に1個ずつ並ぶ。
 * 
 * 出力形式：
 * 厳密に `total=<合計>` という1行を出力する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // 最初の行がクエリの数（または最初の値）であると仮定し、残りをクエリとして扱う。
    // 仕様では「1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」とあるため、
    // 各行が1つのクエリnに対応すると解釈する。
    
    // メモ化テーブル
    const memo = new Map<number, number>();
    let totalCount = 0;

    for (const line of lines) {
        let n: number;
        try {
            n = parseInt(line, 10);
            if (isNaN(n) || n < 1) {
                continue; // 整数として解釈できない行や1未満の値を無視
            }
        } catch (e) {
            continue; // パースエラーがあれば無視
        }

        if (n === 1) {
            // nが1のときの手数は0
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            // このクエリに対する手数は0
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalCount += memo.get(n)!;
            continue;
        }

        // 計算処理（メモ化再帰/動的計画法）
        let count = 0;
        let currentN = n;
        const path = new Set<number>(); // サイクル検出用

        while (currentN !== 1) {
            if (path.has(currentN)) {
                // サイクルに陥った場合、この経路は無限ループになる可能性があるが、
                // この問題（Collatz Conjectureの変種）では1に到達すると仮定されるため、
                // サイクル検出は厳密には不要だが、安全のため。
                // ただし、この問題の文脈では、1に到達するまでのステップ数を求めるため、
                // サイクルが1以外で発生した場合、それは「1に到達しない」ことを意味する。
                // Collatzの性質に基づき、ここでは到達すると仮定して進める。
                // 厳密なメモ化のため、サイクル検出は必須ではないが、ここでは単純に計算を進める。
                // 実際には、この問題は「1に到達するまでの手数」を問うため、
                // サイクルが発生しても、そのサイクル内でのステップ数を加算し続けることになる。
                // しかし、一般的なCollatz問題では、サイクルが発生すると収束しないため、
                // 1に到達するまでのステップ数を求める問題として解釈する。
                // サイクルが発生しても、1に到達する道筋は存在しないため、
                // この問題の制約下では、サイクル検出はスキップし、計算を続ける。
            }
            
            path.add(currentN);

            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            count++;
        }

        // 1に到達したときのステップ数をメモ化
        memo.set(n, count);
        totalCount += count;
    }

    console.log(`total=${totalCount}`);
}

solve();
