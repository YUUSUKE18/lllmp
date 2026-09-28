/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを受け取り、
 * n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n が 1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力に `total=<合計>` を出力する。
 * 
 * 言語・形式:
 * Node.js で動く完全な TypeScript。
 * 
 * 制約:
 * 値と合計は 64bit 整数の範囲に収まる。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
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

    // メモ化テーブル
    const memo = new Map<number, number>();
    let total_count = 0;

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

        let steps = 1;
        let current = n;

        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 計算結果をメモ化
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して計算と合計を求める
    for (const n of queries) {
        // 既にメモ化されているか確認（再帰呼び出しではなく、直接計算結果を求める）
        if (!memo.has(n)) {
            const result = countSteps(n);
            total_count += result;
        } else {
            // メモ化されている場合は直接加算
            total_count += memo.get(n)!;
        }
    }

    // 結果の出力
    console.log(`total=${total_count}`);
}

solve();
