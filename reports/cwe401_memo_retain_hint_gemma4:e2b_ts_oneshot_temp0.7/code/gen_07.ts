const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const numbers = lines.map(line => parseInt(line, 10));

    if (numbers.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    
    /**
     * 置き換え操作を実行し、1に到達するまでの手数を計算する
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

        let steps = 0;
        let current = n;
        
        // 1に到達するまでの経路を追跡し、ステップ数を数える
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

    let totalSteps = 0;

    for (const n of numbers) {
        if (isNaN(n) || n < 1) continue;
        totalSteps += countSteps(n);
    }

    console.log(`total=${totalSteps}`);
}

solve();
