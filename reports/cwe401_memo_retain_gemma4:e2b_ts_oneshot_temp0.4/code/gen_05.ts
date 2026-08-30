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

    // 1. 1つのクエリ n についての手数を計算する関数（メモ化付き）
    const memo = new Map<number, number>();

    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        memo.set(n, steps);
        return steps;
    }

    // 2. すべてのクエリの手数の合計を求める
    let totalSteps = 0;
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            totalSteps += countSteps(n);
        }
    }

    // 3. 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
