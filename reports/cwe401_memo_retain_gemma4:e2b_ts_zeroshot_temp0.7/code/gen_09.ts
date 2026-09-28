/**
 * 仕様を満たすプログラム。
 * 題意はコナーの予想（3n+1問題）の過程をシミュレーションし、そのステップ数を求める問題である。
 * 計算結果をメモ化して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
        return;
    }

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

    if (queries.length === 0) {
        console.log('total=0');
        return;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    let totalCount = 0;

    /**
     * 1からnに到達するまでの手数を再帰的・メモ化的に計算する関数
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

        // 1に到達するまでの過程を追跡
        while (current !== 1) {
            steps++;
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }

        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対する手数を計算し合計する
    for (const n of queries) {
        // 各クエリ n について、n から 1 に到達するまでの手数を計算する。
        // 注意: 仕様の記述「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
        // は、スタート地点 n から 1 に到達するまでの操作回数を意味している。
        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果を出力
    console.log(`total=${totalCount}`);
}

solve();
