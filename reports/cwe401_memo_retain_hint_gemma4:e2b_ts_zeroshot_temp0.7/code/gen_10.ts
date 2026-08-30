/**
 * 仕様を満たすプログラム。
 * 0/1置き換え問題（コネルの予想、または3n+1問題）の解法をメモ化して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input.length === 0) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalSteps = 0;

    /**
     * 3n+1操作を繰り返して1に到達するまでの手数を計算する関数（メモ化付き）
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;

        while (current !== 1) {
            if (current % 2 === 0) {
                // n が偶数なら n/2
                current = Math.floor(current / 2);
            } else {
                // n が奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化（再帰的な呼び出しを考慮に入れるため）
        // ただし、この問題の構造上、単に現在の値の到達回数だけをメモ化する方が効率的。
        // ここでは、クエリごとに計算された最終的な手数をメモ化する。
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリを処理し、合計を計算する
    for (const line of lines) {
        const n = parseInt(line);
        if (isNaN(n) || n < 1) {
            continue; // 整数として解釈できない行や1未満の値を無視
        }

        // 各クエリについて手数を計算（メモ化を利用）
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
