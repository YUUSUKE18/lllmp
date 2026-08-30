const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let totalCount = 0;

    // メモ化のためのマップ
    const memo = new Map<number, number>();

    /**
     * 操作を繰り返して1に到達するまでの手数を計算する関数
     * @param n 初期値
     * @returns 手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let currentN = n;

        while (currentN !== 1) {
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
            
            // 32bit整数には収まらないが64bit整数には収まる範囲でメモ化（安全性を考慮）
            // ここでは、計算過程で値が非常に大きくなる可能性があるため、memo化のキーとしてcurrentNを使用します。
            if (currentN < 0) { // 3n+1操作で負になることはないが念のため
                throw new Error("Negative number encountered");
            }
        }

        // 1に到達した後の操作回数を返す
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して手数を計算し、合計する
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            try {
                const steps = countSteps(n);
                totalCount += steps;
            } catch (e) {
                // エラー処理（ここでは無視または適切なエラー処理）
            }
        }
    }

    // 最終結果を出力
    console.log(`total=${totalCount}`);
}

solve();
