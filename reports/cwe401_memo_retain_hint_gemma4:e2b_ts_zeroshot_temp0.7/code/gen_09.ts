/**
 * 課題: 1に到達するまでの操作回数を求める問題（コネルの問題の変種）。
 * nが偶数なら n/2、奇数なら 3n+1に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * メモ化（動的計画法）を使用して高速化する。
 */

function solve() {
    const fs = require('fs');

    // 標準入力からすべてのデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を1行ごとに分割し、整数としてパースする
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    const queries = lines.map(line => parseInt(line, 10));

    // メモ化テーブル (Map)
    const memo = new Map<number, number>();
    memo.set(1, 0); // ベースケース: 1の手数は0

    /**
     * nから1に到達するまでの手数を再帰的に計算する関数（メモ化付き）
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        // 再帰呼び出しとメモ化
        let steps: number;
        if (n % 2 === 0) {
            // nが偶数なら n/2
            steps = 1 + countSteps(n / 2);
        } else {
            // nが奇数なら 3n+1
            steps = 1 + countSteps(3 * n + 1);
        }

        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリの手数を計算し、合計する
    let totalSteps = 0;
    for (const n of queries) {
        if (isNaN(n) || n < 1) continue; // 無効な入力は無視
        totalSteps += countSteps(n);
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
