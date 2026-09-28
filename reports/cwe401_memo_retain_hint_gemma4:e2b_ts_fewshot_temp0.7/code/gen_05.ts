const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    const N = parseInt(lines[0], 10);
    let current = N;
    let steps = 0;

    // までの手数を計算する関数 (メモ化)
    const calculateSteps = (n: number, memo: Map<number, number>): number => {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let count = 0;
        let current_n = n;
        
        while (current_n !== 1) {
            if (current_n % 2 === 0) {
                current_n = current_n / 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            count++;
        }

        memo.set(n, count);
        return count;
    };

    let total_steps = 0;
    const memo = new Map<number, number>();

    for (let i = 1; i < lines.length; i++) {
        const n = parseInt(lines[i], 10);
        if (!isNaN(n)) {
            const steps = calculateSteps(n, memo);
            total_steps += steps;
        }
    }

    console.log(`total=${total_steps}`);
}

solve();
