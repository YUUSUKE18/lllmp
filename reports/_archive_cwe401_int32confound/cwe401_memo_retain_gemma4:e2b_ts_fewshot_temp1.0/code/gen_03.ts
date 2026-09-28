const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('total=0');
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log('total=0');
        return;
    }

    const queries = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n) && n >= 1);

    if (queries.length === 0) {
        console.log('total=0');
        return;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        // スタックまたは再帰で計算。ここでは動的に計算し、途中結果をメモ化する。
        // 遷移: nが偶数なら n/2, 奇数なら 3n+1
        let steps = 0;
        let current = n;
        const path: number[] = [];

        while (current !== 1) {
            path.push(current);
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 1に到達するまでのステップ数は、計算途中のステップ数 + 1 (最後の1への遷移)
        // 実際には、whileループが1になった時点でその回数がステップ数となる。
        // 例: n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
        // この問題の「手数」は、操作の回数であるため、whileループの反復回数+1 (最初のnからスタートする場合) または 
        // 遷移回数で考える。ここでは「操作の回数」を求めるため、whileループの反復回数で十分。
        
        // 再計算してステップ数を確定させる
        let count = 0;
        let temp = n;
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp /= 2;
            } else {
                temp = 3 * temp + 1;
            }
            count++;
        }
        
        memo.set(n, count);
        return count;
    }

    let total = 0;

    for (const n of queries) {
        if (n >= 1) {
            const steps = countSteps(n);
            total += steps;
        }
    }

    console.log(`total=${total}`);
}

solve();
