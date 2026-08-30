/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを読み込み、
 * n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力に `total=<合計>` を出力する。
 * Node.js, TypeScript, 標準入出力のみ使用する。
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

    // 1. 入力のパースとクエリの抽出
    const queries: number[] = [];
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

    // 2. メモ化のためのキャッシュ (Memoization)
    const memo = new Map<number, number>();
    memo.set(1, 0); // ベースケース: 1 の手数は 0

    /**
     * 繰り返し操作の手数を再帰的に計算する関数 (メモ化付き)
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
        
        // 1 に到達するまでのステップを計算
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

        // 計算結果をメモ化
        memo.set(n, steps);
        return steps;
    }

    // 3. 全クエリの処理と合計の計算
    let totalSteps = 0;
    for (const n of queries) {
        // 各クエリに対して、n から 1 に到達するまでの手数を計算
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 4. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
