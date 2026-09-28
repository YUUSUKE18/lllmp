/**
 * 仕様: 1からスタートし、nが偶数ならn/2、奇数なら3n+1に置き換える操作を1に到達するまでの手数を求める。
 * メモ化（動的計画法/メモ化再帰）を使用して高速化する。
 * 全クエリの手数の合計を求める。
 */

function solve() {
    const fs = require('fs');

    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    
    /**
     * 手数を計算する関数（メモ化付き）
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        // 遷移の計算
        let steps: number;
        if (n % 2 === 0) {
            // nが偶数なら n/2
            steps = 1 + calculateSteps(n / 2);
        } else {
            // nが奇数なら 3n+1
            steps = 1 + calculateSteps(3 * n + 1);
        }

        // メモ化
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);
        
        if (isNaN(n) || n < 1) {
            continue; // 空行や数値でない行は無視
        }

        // 注意: 問題文の解釈として、各クエリ n に対して、そのnから1に到達する手数を求め、それを合計する、と解釈します。
        // もし、各クエリ n が与えられたとき、その n から 1 への遷移の「総ステップ数」を求めたい、という意図であれば、
        // calculateSteps(n) を使います。
        // しかし、仕様は「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」とあり、
        // これは、与えられた初期値 n から 1 に到達するまでのステップ数を求めることを意味します。

        const steps = calculateSteps(n);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
