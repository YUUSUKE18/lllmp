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

    const initialNumbers = lines.map(line => parseInt(line, 10));

    if (initialNumbers.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * 操作の回数を計算する関数（メモ化付き）
     * @param n 初期値
     * @returns 1 に到達するまでの手数
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
        
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化（より効率的なメモ化のため）
        // ここでは、計算結果のみをメモ化するのではなく、経路全体を考慮するアプローチを採用
        // ただし、問題は「各クエリ n について...手数を求め」「すべてのクエリの手数の合計を求める」なので、
        // n から 1 に到達するまでの経路上の各ステップの数を数えるのが直接的。
        
        // 今回の課題の要求は「n が 1 に到達するまでの手数を求め」なので、
        // n から 1 への経路を追跡し、その長さを数える。
        // ただし、入力が「n が 1 に到達するまでの手数を求める」という形で与えられているため、
        // 実際にはコロナル数問題（Collatz Conjecture）のステップ数を求めることを意味します。
        
        // 経路上の各値のメモ化を導入することで、再帰的またはループ的に計算する際に高速化を図ります。
        // ここでは、n から 1 への経路の長さを直接計算します。
        
        // 再計算されたステップ数を格納する（この関数内でのメモ化は、この関数呼び出しの結果に限定する）
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;
    
    for (const n of initialNumbers) {
        if (n >= 1) {
            // メモ化を利用して手数を計算
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
