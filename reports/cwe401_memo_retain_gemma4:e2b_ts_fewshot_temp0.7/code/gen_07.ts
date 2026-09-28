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

    // 入力から整数をパース
    const queries = [];
    for (const line of lines) {
        const num = parseInt(line, 10);
        if (!isNaN(num)) {
            queries.push(num);
        }
    }

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 繰り返し操作の手数を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        if (n === 1) {
            memo.set(1, 0);
            return 0;
        }

        let steps: number;
        if (n % 2 === 0) {
            // n が偶数なら n/2
            steps = 1 + countSteps(n / 2);
        } else {
            // n が奇数なら 3n+1
            steps = 1 + countSteps(3 * n + 1);
        }

        // メモ化
        memo.set(n, steps);
        return steps;
    }

    let total_steps = 0;
    for (const n of queries) {
        // 最初に、クエリごとに計算を行う（メモ化が機能するように）
        // ただし、問題文の意図は「すべてのクエリの合計」であり、クエリごとに独立に計算するのではなく、
        // すべてのクエリを処理し、その合計を求めることである。
        // ここでは、各クエリに対して countSteps を呼び出す。
        total_steps += countSteps(n);
    }

    // 結果の出力
    console.log(`total=${total_steps}`);
}

solve();
