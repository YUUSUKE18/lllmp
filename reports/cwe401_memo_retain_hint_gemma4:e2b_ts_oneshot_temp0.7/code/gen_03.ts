const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Memoization table
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する関数
     * @param n 初期値
     * @returns 手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let currentN = n;
        let steps = 0;
        
        // 3n+1問題の実行
        while (currentN !== 1) {
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化（最適化のため）
        // ただし、この問題では各クエリの計算結果を合計する必要があるため、
        // 経路上の各ステップの総和を直接計算するのではなく、
        // 各初期値 n に対するステップ数のみを計算し、それを合計する。
        // 経路上の値をメモ化するのは、もし同じ入力が何度も与えられた場合の高速化に役立つが、
        // ここでは「n から 1 へのパスの長さ」を求めるため、再帰/反復で十分。
        
        memo.set(n, steps);
        return steps;
    }

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            totalSteps += countSteps(n);
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
