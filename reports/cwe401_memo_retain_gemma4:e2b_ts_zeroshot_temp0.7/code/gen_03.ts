/**
 * 仕様に基づき、コナーの予想（3n+1問題）のステップ数を計算し、その合計を求めるプログラム。
 * メモ化を使用して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').filter(line => line.trim() !== '');

    // メモ化テーブル
    const memo = new Map<number, number>();
    let totalSteps = 0;

    // 各クエリに対して計算を実行
    for (const line of lines) {
        const n = parseInt(line.trim(), 10);

        if (isNaN(n) || n < 1) {
            continue; // 整数として解釈できない、または1未満の行は無視
        }

        if (n === 1) {
            // nが1のときの手数は0
            totalSteps += 0;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
            continue;
        }

        // 計算の実行（再帰/反復）
        let currentN = n;
        let steps = 0;

        while (currentN !== 1) {
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 結果をメモ化し、合計に加算
        memo.set(n, steps);
        totalSteps += steps;
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
