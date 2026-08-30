/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から1以上の整数が1行に1個ずつ与えられる。
 * 各クエリ n について、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * nが1のときの手数は0。
 * すべてのクエリの手数の合計を求める。
 * 標準出力へ `total=<合計>` を出力する。
 * 計算結果をメモ化して高速化する。
 * Node.jsで動作する完全なTypeScript。
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
    let totalCount = 0;

    /**
     * 繰り返し操作の手数を再帰的に計算する関数（メモ化付き）
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;

        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        memo.set(n, steps);
        return steps;
    }

    for (const line of lines) {
        const n = parseInt(line, 10);
        
        if (isNaN(n) || n < 1) {
            continue; // 整数として解釈できない行や1未満の値を無視
        }

        // nが1の場合、手数は0
        if (n === 1) {
            // 1という値が与えられた場合、これはクエリの結果ではなく、
            // 1に到達するまでの操作数を問うているため、countSteps(1) = 0 を加算する。
            // ただし、仕様の解釈として「クエリ n について、nが1のときの手数は0」とあるため、
            // もし入力がnそのものをクエリとして扱うなら、n=1の場合は0を合計に加える。
            totalCount += 0;
            continue;
        }

        const steps = countSteps(n);
        totalCount += steps;
    }

    console.log(`total=${totalCount}`);
}

solve();
