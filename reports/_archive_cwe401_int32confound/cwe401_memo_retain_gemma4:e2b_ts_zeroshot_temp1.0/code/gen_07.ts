/**
 * 仕様に従い、コネルの問題（3n+1問題）の動作をシミュレーションし、
 * その手数をメモ化して合計を求めるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    let totalSteps = 0;
    const memo = new Map<number, number>();

    for (const line of input) {
        const lineTrimmed = line.trim();
        if (lineTrimmed === "") continue;

        const n = parseInt(lineTrimmed, 10);

        if (isNaN(n) || n < 1) continue;

        // メモ化された値があればそれを返す
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
            continue;
        }

        // ベースケース
        if (n === 1) {
            memo.set(1, 0);
            totalSteps += 0;
            continue;
        }

        let current = n;
        const path: number[] = [];

        // 1 に到達するまでのパスを探索し、各ステップでの値を記録する
        while (current !== 1) {
            path.push(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        path.push(1); // 最終的に1に到達した

        // 手数を計算（パスの長さ = 手数）
        const steps = path.length - 1;

        // メモ化
        memo.set(n, steps);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
