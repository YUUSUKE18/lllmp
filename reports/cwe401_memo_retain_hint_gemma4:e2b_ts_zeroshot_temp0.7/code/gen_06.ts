/**
 * 仕様: 
 * 標準入力から与えられたクエリに対して、
 * nが偶数なら n/2、奇数なら 3n+1 の操作を繰り返し、1に到達するまでの手数を求める。
 * 全ての手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 64bit整数で収まる可能性があるため、JavaScriptのNumber型（64bit浮動小数点数）を使用する。
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

        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                // nが偶数なら n/2
                current = current / 2;
            } else {
                // nが奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 1に到達した後のステップ数を記録
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して計算を実行し、合計を求める
    for (const line of lines) {
        const n = parseInt(line, 10);

        if (isNaN(n) || n < 1) {
            // 整数として解釈できない行や1未満の値を無視
            continue;
        }

        // メモ化された結果を利用して手数を計算
        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果を出力
    console.log(`total=${totalCount}`);
}

solve();
