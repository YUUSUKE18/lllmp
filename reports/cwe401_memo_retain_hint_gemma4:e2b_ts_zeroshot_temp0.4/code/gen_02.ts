/**
 * 仕様に基づき、コネルの予想（3n+1問題）の解法をメモ化して高速化したプログラム。
 * 標準入力からクエリを読み込み、各クエリの1への到達手数を計算し、その合計を出力する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * 1に到達するまでの手数を再帰的に計算し、メモ化する関数。
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
            steps = countSteps(n / 2);
        } else {
            // n が奇数なら 3n+1
            steps = 1 + countSteps(3 * n + 1);
        }

        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") {
            continue;
        }

        const n = parseInt(trimmedLine, 10);

        // 入力された n が 1 以上の整数であるか確認
        if (isNaN(n) || n < 1) {
            continue;
        }

        // 各クエリに対して計算を実行
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
