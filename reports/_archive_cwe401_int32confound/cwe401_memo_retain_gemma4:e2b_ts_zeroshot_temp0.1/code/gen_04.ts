/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n=1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * Node.js で動作する完全な TypeScript。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount: bigint = 0n;

    for (const line of lines) {
        let n: number;
        try {
            n = parseInt(line, 10);
            if (isNaN(n) || n < 1) {
                continue; // 整数として解釈できない行や1未満の値を無視
            }
        } catch (e) {
            continue; // 処理中にエラーが発生した場合は無視
        }

        if (n === 1) {
            // n=1 のときの手数は 0
            const count = 0;
            memo.set(1, count);
            totalCount += BigInt(count);
            continue;
        }

        // 再帰的または反復的に計算し、メモ化を利用する
        let steps = 0;
        let currentN = n;
        const path: number[] = []; // 経路を記録してメモ化を効率的に行うため（今回は直接計算で十分だが、再帰的な構造を想定して）

        // 経路を記録しながら計算（メモ化の恩恵を最大限に受けるため、再帰的な構造を模倣する）
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                steps += memo.get(currentN);
                // 経路を遡って合計を計算するのではなく、現在のステップ数を加算する
                // ここでは、nから1に到達するまでの「手数」を求めるため、再帰的な構造を直接模倣する。
                // 既存のメモ化値が「1に到達するまでの手数」であると仮定して、現在の計算を続ける。
                // ただし、この問題は「nから1に到達するまでの操作回数」を求めるため、
                // 1に到達するまでの過程を追う必要がある。
                
                // 既存のメモ化値が「nから1への手数」を意味する場合、
                // n -> m の操作で、mから1への手数を加算する。
                // しかし、この問題は「nから1への手数」を求めるため、
                // 1に到達するまでの過程を追うのが最も直接的。
                
                // ここでは、nから1への手数を求めるため、再帰的な構造を直接適用する。
                // 既存のメモ化値が既に存在する場合は、その値を使用する。
                steps += memo.get(currentN);
                break; // 既にメモ化されている場合はループを抜ける
            }
            
            path.push(currentN);
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 最終的な手数をメモ化
        memo.set(n, steps);
        totalCount += BigInt(steps);
    }

    // 結果の出力
    console.log(`total=${totalCount.toString()}`);
}

solve();
