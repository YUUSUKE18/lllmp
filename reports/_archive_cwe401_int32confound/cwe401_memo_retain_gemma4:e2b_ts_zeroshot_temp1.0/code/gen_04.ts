/**
 * 仕様に基づき、コナーの予想（3n+1問題）のステップ数を計算し、その合計を求めるプログラム。
 * 計算結果をメモ化（動的計画法）して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log("total=0");
        return;
    }

    // 入力行から整数を抽出する
    const queries = [];
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル (memoization)
    const memo: Map<number, number> = new Map();
    let totalSteps = 0;

    /**
     * 繰り返し操作の手数を再帰的に計算する関数。
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps: number;
        // n が偶数なら n/2, 奇数なら 3n+1
        if (n % 2 === 0) {
            steps = 1 + countSteps(n / 2);
        } else {
            steps = 1 + countSteps(3 * n + 1);
        }

        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して計算と合計を行う
    for (const n of queries) {
        // 各クエリの計算結果を求める（再帰呼び出しでメモ化も更新される）
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
