/**
 * 仕様を満たすプログラム
 * 1. 1 以上の整数がクエリとして入力される。
 * 2. nが偶数なら n/2、奇数なら 3n+1に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * 3. すべてのクエリの手数の合計を求める。
 * 4. 計算結果をメモ化して高速化する。
 * 5. 標準出力に `total=<合計>` を出力する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // 1. 入力のパースとフィルタリング
    const queries: number[] = [];
    for (const line of lines) {
        const num = parseInt(line, 10);
        if (!isNaN(num) && num >= 1) {
            queries.push(num);
        }
    }

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // 2. メモ化された関数 (Memoization)
    // 32bitではなく64bitの範囲を考慮し、Mapでメモ化する
    const memo = new Map<number, number>();

    /**
     * 1に到達するまでの手数を計算する関数
     * @param n 初期値
     * @returns 手数
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
                current = Math.floor(current / 2);
            } else {
                // nが奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 最終的な結果をメモ化
        memo.set(n, steps);
        return steps;
    }

    // 3. 全クエリの処理と合計の計算
    let totalSteps = 0;
    for (const n of queries) {
        totalSteps += countSteps(n);
    }

    // 4. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
