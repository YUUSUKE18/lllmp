/**
 * 仕様を満たすプログラムを実装します。
 * 1から1に到達するまでの手数を計算し、その合計を求めます。
 * 計算にはメモ化（動的計画法）を用いて高速化します。
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

    // 整数として解釈できるクエリを抽出
    const queries = [];
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

    // メモ化テーブルを初期化。dp[n] は n から 1 に到達する手数を格納する。
    // 1 は手数が 0。
    const memo: Map<number, number> = new Map();
    memo.set(1, 0);

    /**
     * n から 1 に到達する手数を再帰的メモ化（DP）で計算する関数。
     * @param n 現在の数
     * @returns 1 に到達する手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let result: number;
        if (n % 2 === 0) {
            // n が偶数なら n/2
            result = countSteps(n / 2) + 1;
        } else {
            // n が奇数なら 3n+1
            result = countSteps(3 * n + 1) + 1;
        }

        memo.set(n, result);
        return result;
    }

    let totalSteps = 0;

    // すべてのクエリについて手数を計算し、合計を求める
    for (const n of queries) {
        // ただし、クエリが非常に大きい場合、再帰の深さが問題になる可能性があるため、
        // memoizationを最大限に活用しつつ、再帰呼び出し自体を工夫する。
        // 今回の制約では、計算結果が64bitに収まることから、再帰ベースのDPで十分と考えられます。

        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
