/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n が 1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * 
 * 言語・形式: Node.jsで動く完全なTypeScript。外部パッケージ不使用。
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
            continue; // 処理中にエラーが発生した場合は無視
        }

        if (n === 1) {
            // n が 1 のときの手数は 0
            const count = 0;
            if (!memo.has(n)) {
                memo.set(n, count);
            }
            totalCount += count;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalCount += memo.get(n)!;
            continue;
        }

        // 再帰的または反復的に計算
        let currentN = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (currentN !== 1) {
            if (path.has(currentN)) {
                // サイクルに陥った場合、この経路は無限ループになるため、
                // サイクル内の値は到達不可能（または無限のステップ）と見なす。
                // ただし、この問題の操作 (3n+1, n/2) は通常、1に収束することが期待される。
                // サイクル検出は、到達可能性を保証するために重要だが、ここでは単純に計算を続ける。
                // 実際には、この問題はCollatz予想に関連しており、1に収束すると仮定する。
                // サイクル検出は、計算が非常に長くなるのを防ぐための安全策。
                // ここでは、単純に計算を続けることを優先する。
            }
            
            path.add(currentN);

            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 1 に到達したときのステップ数を記録
        const result = steps;
        memo.set(n, result);
        totalCount += result;
    }

    console.log(`total=${totalCount}`);
}

solve();
