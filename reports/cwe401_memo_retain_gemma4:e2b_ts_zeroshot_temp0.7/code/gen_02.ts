/**
 * 仕様に基づき、Collatz数列の手数を計算し、その合計を求めるプログラム。
 * メモ化（動的計画法）を使用して高速化する。
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

    // 1. クエリの読み込みと整数としてフィルタリング
    const queries = [];
    for (const line of lines) {
        const num = parseInt(line);
        if (!isNaN(num) && num >= 1) {
            queries.push(num);
        }
    }

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // 2. メモ化テーブルの初期化
    // memo[n] は n から 1 に到達する手数を格納する。
    // 64bit整数に対応するため、Mapを使用する。
    const memo = new Map<number, number>();
    memo.set(1, 0); // ベースケース: 1 から 1 への手数は 0

    // 3. 再帰関数（メモ化付き）の実装
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        // 再帰的に計算
        let nextN: number;
        if (n % 2 === 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        // 遷移先のステップ数を計算し、メモ化
        const steps = 1 + countSteps(nextN);
        memo.set(n, steps);
        return steps;
    }

    // 4. 全クエリの処理と合計の計算
    let totalSteps = 0;
    for (const n of queries) {
        // 各クエリに対して計算を実行し、結果を合計に加算
        // 注意: countStepsは再帰的に計算し、その結果をmemoに格納する。
        // 実際には、クエリごとに計算が必要であり、memoは再帰呼び出しの結果をキャッシュする。
        // ここでは、各クエリに対する結果を直接求める。
        
        // 再帰関数を呼び出すことで、必要な全ての計算がメモ化される。
        totalSteps += countSteps(n);
    }

    // 5. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
