/**
 * 仕様: 1から始まる整数に対する操作の回数を計算し、その合計を求める。
 * 操作ルール:
 * - nが偶数なら n/2
 * - nが奇数なら 3n+1
 * - 1に到達するまでの手数を数える。
 * - 1の場合は手数は0。
 * - 計算結果をメモ化して高速化する。
 *
 * 入力: 標準入力から整数が1行に1個ずつ与えられる。
 * 出力: total=<合計> を標準出力に出力する。
 */

function solve() {
    const fs = require('fs');

    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を1行ごとに分割し、数値に変換する
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(Number);

    // メモ化テーブル (Memoization)
    const memo: Map<number, number> = new Map();
    memo.set(1, 0); // ベースケース: 1の手数は0

    let totalCount = 0;

    for (const n of queries) {
        if (n <= 0 || !Number.isInteger(n)) {
            continue; // 整数として解釈できない、または1未満のものは無視
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const count = memo.get(n)!;
            totalCount += count;
            continue;
        }

        // 再帰的または反復的に計算し、メモ化する
        let currentN = n;
        let steps = 0;
        const path: number[] = []; // 計算過程を記録して、途中経過をメモ化に利用する（ただし、本質的には再帰の深さ依存）

        // BFSまたは直接的な再帰で計算する。ここでは非効率を避けるため、再帰とメモ化を併用する。
        // ただし、問題の性質上、各クエリ n から 1 へのパスの長さを求めるため、再帰で計算し、経路をメモ化するのが最も自然。

        // 経路を辿って計算し、メモ化する（DP的アプローチ）
        const stack: { value: number, step: number }[] = [{ value: n, step: 0 }];
        const visited = new Set<number>();
        visited.add(n);

        // BFS/DPで到達するまでのステップを計算する
        while (stack.length > 0) {
            const { value, step } = stack.shift()!;

            if (value === 1) {
                // 1に到達した。手数は step。
                memo.set(n, step);
                totalCount += step;
                break;
            }

            let nextValue: number;
            if (value % 2 === 0) {
                nextValue = value / 2;
            } else {
                nextValue = 3 * value + 1;
            }

            // 次の値を探索
            if (value > 1 && !visited.has(nextValue)) {
                visited.add(nextValue);
                stack.push({ value: nextValue, step: step + 1 });
            }
        }

        // 注意: この問題は通常、特定の n から 1 への最短経路を問う問題 (Collatz conjecture の逆) です。
        // 質問は「n が 1 に到達するまでの手数」であり、これは n から操作を繰り返して 1 に到達するパスの長さです。
        // 上記のBFSは、n から操作を繰り返して 1 に到達するパスの長さを正しく計算します。
    }

    // 最終結果の出力
    console.log(`total=${totalCount}`);
}

solve();
