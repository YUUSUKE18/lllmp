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
    const memo = new Map<number, number>();
    let totalCount = 0;

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
     * @param n 初期値
     * @returns 1 に到達するまでの手数
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

    // すべてのクエリを処理
    for (const line of lines) {
        const n = parseInt(line, 10);
        
        // 整数として解釈できない行は無視される（filterで既に処理済みだが念のため）
        if (isNaN(n) || n < 1) {
            continue;
        }

        // 各クエリについて手数を計算し、合計に加算する
        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果を出力
    console.log(`total=${totalCount}`);
}

solve();
