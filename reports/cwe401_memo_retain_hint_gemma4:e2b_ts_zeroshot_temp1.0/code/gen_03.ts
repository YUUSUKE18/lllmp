/**
 * 仕様を満たすプログラム
 */

function solve() {
    const fs = require('fs');

    // 標準入力からすべてのデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
        return;
    }

    // 最初の行がクエリのリスト
    const queries = input;
    let totalSteps = 0;

    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * n が 1 に到達するまでの手数を再帰的に計算する関数（メモ化付き）
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
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
            // 念のため、計算途中で無限ループや非常に大きな値になることを防ぐためのチェックは、
            // この問題の性質上、1に到達することが保証されているため省略する。
        }

        // 計算された手数をメモ化して返す
        memo.set(n, steps);
        return steps;
    }

    // すべての行を処理する
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine === '') {
            continue;
        }

        const n = parseInt(trimmedLine, 10);

        if (!isNaN(n) && n >= 1) {
            // 手数を計算し、合計に加算する
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
