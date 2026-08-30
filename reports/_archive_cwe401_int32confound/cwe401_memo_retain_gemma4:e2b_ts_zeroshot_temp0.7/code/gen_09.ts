/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から1以上の整数が1行に1個ずつ与えられる。
 * 各クエリ n について、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * nが1のときの手数は0。
 * すべてのクエリの手数の合計を求める。
 * 結果は `total=<合計>` の形式で出力する。
 * 同じ整数が繰り返し現れるため、計算結果をメモ化して高速化する。
 * Node.jsで動作する完全なTypeScript。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === "") {
        console.log("total=0");
        return;
    }

    // 入力から整数を読み込む
    const queries: number[] = [];
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル (Memoization)
    const memo = new Map<number, number>();
    memo.set(1, 0); // ベースケース: 1の手数は0

    /**
     * 任意の数 n から 1 に到達するまでの手数を再帰的に計算する（メモ化付き）
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

    // 各クエリに対して計算と合計を求める
    for (const n of queries) {
        // 計算開始。メモ化された結果が利用される。
        const result = countSteps(n);
        totalSteps += result;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
