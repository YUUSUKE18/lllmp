const fs = require('fs');

function solve() {
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

    // 座標 (n) から 1 に到達するまでの手数をメモ化するためのマップ
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * 座標 n から 1 に到達するまでの手数を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps: number;
        if (n % 2 === 0) {
            // n が偶数なら n/2
            steps = 1 + calculateSteps(n / 2);
        } else {
            // n が奇数なら 3n+1
            steps = 1 + calculateSteps(3 * n + 1);
        }

        memo.set(n, steps);
        return steps;
    }

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) {
            continue;
        }
        
        // 各クエリについて手数を計算し、合計に加算する
        const steps = calculateSteps(n);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
