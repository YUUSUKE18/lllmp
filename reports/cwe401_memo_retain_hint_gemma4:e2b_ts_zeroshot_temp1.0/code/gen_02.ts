/**
 * 仕様: 
 * 標準入力から与えられたクエリに対し、nが偶数ならn/2、奇数なら3n+1を繰り返して1に到達するまでの手数を求める。
 * 結果の合計を求め、"total=<合計>"として出力する。
 * メモ化（動的計画法的なアプローチ）を用いて高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を1行ごとに分割し、整数としてフィルタリングする
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n) && n >= 1);

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0); // n=1の手数は0

    /**
     * 繰り返し操作の手数を再帰的（メモ化再帰）に計算する関数
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

        let steps;
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

    let totalSteps = 0;

    for (const n of queries) {
        // 各クエリに対してステップ数を計算し、合計に加算する
        // 最初にクエリ n について計算を実行する。
        // 複数のクエリが与えられた場合、各クエリに対するステップ数を計算する。
        // 問題の解釈として、「各クエリ n について、nが1に到達するまでの手数を求め、その合計を求める」と解釈し、
        // 各クエリ n を個別に計算する。
        
        // memo化が効いているため、この呼び出しは高速になる。
        totalSteps += countSteps(n);
    }

    console.log(`total=${totalSteps}`);
}

solve();
