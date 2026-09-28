/**
 * 仕様: 1からスタートし、nが偶数ならn/2、nが奇数なら3n+1に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount = 0;

    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") continue;

        const n = parseInt(trimmedLine, 10);

        if (isNaN(n) || n < 1) continue;

        // 再帰/メモ化による計算関数
        function countSteps(currentN: number): number {
            if (currentN === 1) {
                return 0;
            }
            if (memo.has(currentN)) {
                return memo.get(currentN)!;
            }

            let steps = 0;
            let current = currentN;

            // 1に到達するまでの操作をシミュレーション
            while (current !== 1) {
                if (current % 2 === 0) {
                    current = current / 2;
                } else {
                    current = 3 * current + 1;
                }
                steps++;
            }
            
            // ここで、元の問題の意図を再確認します。
            // 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
            // これは、元の問題（コナーズの予想に関連する）の「ステップ数」を求める問題と解釈されます。
            // 1からスタートして1に到達するまでの操作の数を数える。

            // 再度、memo化のロジックを修正して、1からスタートしてnに到達する操作数を求めるようにする。
            // しかし、クエリは「nから1に到達するまでの手数」を求めているため、再帰的なメモ化が適切です。
            // 1からスタートしてnに到達する操作数を求めるのが、通常、この種の問題のメモ化に適しています。
            
            // ここでは、元の問題の指示を厳密に解釈し、nから1への経路を数えます。
            // ただし、メモ化は、同じ中間値からの到達ステップ数をキャッシュするために使います。
            
            // 修正後のロジック: nから1へのステップ数を計算する
            let currentSteps = 0;
            let tempN = currentN;
            while (tempN !== 1) {
                if (tempN % 2 === 0) {
                    tempN = tempN / 2;
                } else {
                    tempN = 3 * tempN + 1;
                }
                currentSteps++;
            }
            
            memo.set(currentN, currentSteps);
            return currentSteps;
        }

        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
