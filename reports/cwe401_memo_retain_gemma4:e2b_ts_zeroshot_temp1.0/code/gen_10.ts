/**
 * 仕様に従って、コナーの予想（3n+1問題）のステップ数を計算し、その合計を求めるプログラム。
 * メモ化を使用して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log("total=0");
        return;
    }

    // 1行目からクエリを読み込む
    const queries = input.map(line => parseInt(line.trim(), 10)).filter(n => !isNaN(n) && n >= 1);

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * 繰り返し操作の手数を再帰的に計算する関数（メモ化付き）
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

        let steps = 0;
        let current = n;

        while (current !== 1) {
            if (current % 2 === 0) {
                // n が偶数なら n/2
                current = current / 2;
            } else {
                // n が奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対する手数を計算し、合計を求める
    let totalSteps = 0;

    for (const n of queries) {
        // すべての経路が1に到達することを確認するために、ステップ数を計算する
        // ただし、問題文の操作（nが偶数ならn/2、奇数なら3n+1）は、通常、nが1になるまで繰り返すことを指す。
        // ここで求めたいのは、与えられたnから1に到達するまでの「操作の回数」である。
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
