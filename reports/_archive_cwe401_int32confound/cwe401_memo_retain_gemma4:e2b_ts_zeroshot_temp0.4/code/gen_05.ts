/**
 * 仕様を満たすプログラム
 * 
 * 課題：
 * 標準入力から与えられた整数 n に対して、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 
 * 言語・形式：
 * Node.js で動く完全な TypeScript。
 * 標準入力から読み込み、標準出力に `total=<合計>` を出力する。
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

    // 入力は1行に1個ずつ並ぶ整数
    const queries = lines.map(Number);

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount: bigint = 0n;

    /**
     * 繰り返し操作の手数を計算する関数 (メモ化付き)
     * @param n 初期値
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
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化（これは一般的なメモ化の応用だが、ここではクエリごとの計算結果のみを保存する）
        // 課題の要求は「各クエリ n について、n が1に到達するまでの手数を求める」ことなので、
        // ここでは n から 1 への経路の長さを求める。
        
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリについて計算と合計を求める
    for (const n of queries) {
        if (n >= 1) {
            const steps = countSteps(n);
            totalCount += BigInt(steps);
        }
    }

    // 結果の出力
    console.log(`total=${totalCount.toString()}`);
}

solve();
