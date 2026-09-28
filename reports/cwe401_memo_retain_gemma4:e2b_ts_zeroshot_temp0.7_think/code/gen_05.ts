import * as process from 'process';

/**
 * メモ化された関数：nから1に到達するまでの手数を計算する。
 * @param n 初期値
 * @param memo 計算結果を保存するためのマップ
 * @returns 1に到達するまでのステップ数
 */
function countSteps(n: number, memo: Map<number, number>): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let current = n;
    let steps = 0;

    // nが1になるまで繰り返す
    while (current !== 1) {
        if (current % 2 === 0) {
            // 偶数なら n/2
            current /= 2;
        } else {
            // 奇数なら 3n+1
            current = 3 * current + 1;
        }
        steps++;
    }

    // 計算結果をメモ化
    memo.set(n, steps);
    return steps;
}

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split('\n');
    
    // 処理対象の整数を抽出
    const queries: number[] = [];
    for (const line of lines) {
        const num = parseInt(line.trim(), 10);
        if (!isNaN(num) && num >= 1) {
            queries.push(num);
        }
    }

    // メモ化のためのキャッシュ
    const memo = new Map<number, number>();
    let totalSteps = 0;

    for (const n of queries) {
        // countSteps関数を実行し、結果を合計に加える
        const steps = countSteps(n, memo);
        totalSteps += steps;
    }

    // 結果を出力
    process.stdout.write(`total=${totalSteps}\n`);
}

solve();
