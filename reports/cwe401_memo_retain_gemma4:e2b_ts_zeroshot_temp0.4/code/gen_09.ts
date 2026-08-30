/**
 * 仕様を満たすプログラムを実装します。
 * 
 * 仕様:
 * - 標準入力から整数クエリを読み込む。
 * - 各クエリ n について、nが偶数なら n/2、奇数なら 3n+1 を繰り返して 1 に到達するまでの手数を求める。
 * - n=1 の場合は手数は 0。
 * - すべてのクエリの手数の合計を求める。
 * - 計算結果をメモ化して高速化する。
 * - 標準出力に `total=<合計>` を出力する。
 * - 64bit整数で収まるが32bit整数には収まらない値も扱う。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
        return;
    }

    // 入力から整数を読み込む
    const queries = [];
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num)) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
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

    let totalSteps = 0;

    // 各クエリに対して計算と合計を求める
    for (const n of queries) {
        // n が1以上の整数であるという前提に基づき計算
        if (n >= 1) {
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
