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

    // 繰り返し操作の計算をメモ化する
    const memo = new Map<number, number>();

    /**
     * 繰り返し操作 (nが偶数ならn/2, 奇数なら3n+1) を1に到達するまでの手数を計算する
     * @param n 開始値
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
        const path = new Set<number>(); // 無限ループ防止のためのチェック

        while (current !== 1) {
            if (path.has(current)) {
                // 無限ループに陥った場合、これは通常発生しないはずだが、安全策として扱う
                // 問題の制約上、1に到達するはずなので、ここではエラーとして扱うか、無視する
                // 今回は制約に基づき、このパスは到達しないと仮定して処理を続行（実際には制約内で収束する）
                break; 
            }
            path.add(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 1に到達したと仮定して結果をメモ
        if (current === 1) {
            // 逆順にステップ数を計算し直す必要がある。
            // 現在の実装では、whileループ内でステップ数をカウントしているので、
            // 1に到達したときのstepsが正しい。
            memo.set(n, steps);
            return steps;
        }
        
        // 理論上は到達するはずだが、念のため
        memo.set(n, Infinity);
        return Infinity;
    }

    let totalSteps = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            // 各クエリで計算
            const steps = countSteps(n);
            if (steps !== Infinity) {
                totalSteps += steps;
            }
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
