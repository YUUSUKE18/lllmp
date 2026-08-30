/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n=1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 入力は1行に1個の整数が並ぶ。
 * 
 * この問題は、Collatzの予想に関連する操作であり、メモ化（動的計画法またはメモ化再帰）を用いて効率的に解く必要がある。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力をスペースで分割し、整数のみを抽出
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(line => parseInt(line, 10));

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * Collatz操作の回数を計算する関数（メモ化付き）
     * @param n 開始値
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n < 1) {
            // 仕様では1以上の整数が与えられる前提だが、念のため
            return Infinity;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const path: number[] = [];

        while (current !== 1) {
            // メモ化のために現在のパスを記録しておく
            path.push(current);
            
            if (current % 2 === 0) {
                current /= 2;
            } else {
                // 3n + 1。64bit整数に収まることを前提とする。
                current = 3 * current + 1;
            }
        }

        // 1 に到達するまでの手数はパスの長さ + 1 (最初のnからスタート)
        // ただし、n=1の場合は0手数なので、n>1の場合、pathの長さが手数になる。
        // n=4 -> 2 -> 1 (2ステップ)
        // n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
        // pathはn, n_1, n_2, ..., 1 を格納する。
        // 実際の操作回数は path.length - 1 (nから1までの遷移回数) + 1 (最後の1への到達) ではない。
        // nから1に到達するまでの操作回数を数える。
        
        // 再計算: n=4
        // 4 -> 2 (1回)
        // 2 -> 1 (2回) -> 手数 2
        
        let steps = 0;
        let temp = n;
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp /= 2;
            } else {
                temp = 3 * temp + 1;
            }
            steps++;
        }

        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (n >= 1) {
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
