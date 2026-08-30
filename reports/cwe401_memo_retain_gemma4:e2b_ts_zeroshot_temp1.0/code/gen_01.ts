/**
 * 仕様に基づき、Collatz予想（3n+1問題）の計算をメモ化して高速化し、
 * すべてのクエリの手数の合計を求めるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を1以上の整数としてパースし、空行や不正な行を無視する
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(Number);

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化のためのキャッシュ
    const memo: Map<number, number> = new Map();
    memo.set(1, 0); // 基底ケース: 1 の手数は 0

    /**
     * Collatz操作を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function collatzSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let count = 0;
        let current = n;

        // 1 に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                // n が偶数なら n / 2
                current /= 2;
            } else {
                // n が奇数なら 3n + 1
                current = 3 * current + 1;
            }
            count++;
        }

        // 計算した結果をメモ化
        memo.set(n, count);
        return count;
    }

    let totalSteps = 0;

    // 各クエリに対して計算を実行し、合計を求める
    for (const n of queries) {
        if (n >= 1) {
            const steps = collatzSteps(n);
            totalSteps += steps;
        }
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
