const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split(/\s+/).filter(line => line.length > 0);
    
    // メモ化のためのキャッシュ
    const memo = new Map<number, number>();
    
    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する関数
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;

        while (current !== 1) {
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // パスをメモ化
        // 注意: この問題は、与えられた経路の長さ（手数）を求める問題であり、
        // サイクルを検出した後の最短経路を求める問題ではないため、
        // 実際に計算したパスの長さを保存します。
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            // 各クエリについて計算
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
