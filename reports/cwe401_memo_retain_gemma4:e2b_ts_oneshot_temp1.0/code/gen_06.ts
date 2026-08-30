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

    // 各クエリを読み込む
    const queries = lines.map(line => parseInt(line, 10));

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 操作を繰り返して 1 に到達するまでの手数を計算する
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

        let steps = 1;
        let current = n;
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 経路上のすべての値のメモ化 (DP/Memoization)
        // 厳密には、元の n から 1 に到達するまでの経路上の全ての値についてメモ化を更新する必要があるが、
        // ここでは「n から 1 に到達するまでの手数」のみを求めるため、再帰的なメモ化が効率的。
        // しかし、制約上、単なるループ計算で十分であり、n が非常に大きい場合、経路全体のメモ化は複雑になる。
        // 問題文の意図を「各クエリ n について、n から 1 に到達するまでの手数を求め、その合計を求める」と解釈し、
        // 各クエリごとに計算する形で進める。
        
        // 再帰的なメモ化を適用し直す
        const result = calculateStepsRecursive(n);
        memo.set(n, result);
        return result;
    }

    /**
     * 再帰的なメモ化を用いたステップ計算（一般的なCollatz問題の解法）
     */
    function calculateStepsRecursive(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let nextN: number;
        if (n % 2 === 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        const steps = 1 + calculateStepsRecursive(nextN);
        memo.set(n, steps);
        return steps;
    }


    let totalSteps = 0;

    for (const n of queries) {
        if (n < 1 || !Number.isInteger(n)) continue; // 1以上の整数のみを考慮

        // 各クエリ n について手数を計算し、メモ化を更新しながら合計を求める
        // ここでは、各クエリに対して個別に計算し、Memoizationを利用する
        const steps = calculateStepsRecursive(n);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
