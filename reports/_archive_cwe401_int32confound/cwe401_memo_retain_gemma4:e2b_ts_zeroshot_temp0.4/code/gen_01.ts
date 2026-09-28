/**
 * 仕様を満たすプログラム
 * 
 * ゆうめい数問題（3n+1問題）の操作回数を計算し、その合計を求める。
 * メモ化（動的計画法/メモ化再帰）を用いて高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount = 0;

    /**
     * 3n+1操作の回数を再帰的に計算する関数（メモ化付き）
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

        let steps: number;
        if (n % 2 === 0) {
            // n が偶数なら n/2
            steps = 1 + countSteps(n / 2);
        } else {
            // n が奇数なら 3n+1
            steps = 1 + countSteps(3 * n + 1);
        }

        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して計算と合計を行う
    for (const line of lines) {
        const n = parseInt(line, 10);
        
        if (isNaN(n) || n < 1) {
            continue; // 整数として解釈できない行や1未満の数は無視
        }

        // 各クエリについて計算を実行
        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
