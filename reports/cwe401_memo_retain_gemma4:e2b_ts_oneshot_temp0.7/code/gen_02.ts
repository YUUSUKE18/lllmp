const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    //  memoization table
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * 変換操作を再帰的に計算し、メモ化する関数
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

        let steps: number;
        if (n % 2 === 0) {
            // n が偶数なら n/2
            steps = 1 + countSteps(n / 2);
        } else {
            // n が奇数なら 3n+1
            steps = 1 + countSteps(3 * n + 1);
        }

        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対する計算と合計
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
