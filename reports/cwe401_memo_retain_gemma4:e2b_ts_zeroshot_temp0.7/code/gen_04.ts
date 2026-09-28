/**
 * 仕様を満たすプログラムを実装します。
 * 
 * 仕様:
 * - 標準入力から1以上の整数が1行に1個ずつ与えられる。
 * - クエリ n について、nが偶数なら n/2、奇数なら 3n+1に置き換える操作を1に到達するまでの手数を求める。
 * - n=1のときの手数は0。
 * - すべてのクエリの手数の合計を求める。
 * - 計算結果をメモ化して高速化する。
 * - 標準出力に `total=<合計>` を出力する。
 * - Node.jsで動作する完全なTypeScript。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === "") {
        console.log("total=0");
        return;
    }

    // 入力から整数を抽出する
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

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    let total_count = 0;

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
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

        let steps = 0;
        let current = n;

        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化（オプションだが、再計算の最適化として）
        // この問題の要求は「nから1に到達するまでの手数」なので、nだけをメモ化すれば十分。
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリを処理し、合計を計算する
    for (const n of queries) {
        const steps = countSteps(n);
        total_count += steps;
    }

    // 結果を出力
    console.log(`total=${total_count}`);
}

solve();
