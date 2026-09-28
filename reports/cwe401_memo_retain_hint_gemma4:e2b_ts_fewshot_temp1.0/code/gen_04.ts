const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let total = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        let n: number;
        const num = parseInt(line, 10);

        if (isNaN(num)) {
            continue;
        }
        n = num;

        if (n === 1) {
            total += 0;
            continue;
        }

        // メモ化された結果があればそれを使用
        if (memo.has(n)) {
            total += memo.get(n);
            continue;
        }

        // 再帰的/動的計画法的に計算
        let count = 0;
        let current = n;
        let steps = 0;

        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        total += steps;
        memo.set(n, steps);
    }

    console.log(`total=${total}`);
}

solve();
