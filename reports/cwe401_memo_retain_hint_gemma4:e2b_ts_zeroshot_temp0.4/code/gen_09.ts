/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを受け取り、
 * nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求め、`total=<合計>`として出力する。
 * 計算結果をメモ化して高速化する。
 * 
 * 言語・形式:
 * Node.jsで動く完全なTypeScript。標準入力から読み込み、標準出力に結果を出力する。
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

    /**
     * 繰り返し操作の手数を計算する関数 (メモ化付き)
     * @param n 開始値
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
                // nが偶数なら n/2
                current = current / 2;
            } else {
                // nが奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 1に到達するまでの手数を計算し、メモ化
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const line of lines) {
        // 入力として整数として解釈できるか確認
        const n = parseInt(line, 10);

        if (!isNaN(n) && n >= 1) {
            // 各クエリに対して手数を計算
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
