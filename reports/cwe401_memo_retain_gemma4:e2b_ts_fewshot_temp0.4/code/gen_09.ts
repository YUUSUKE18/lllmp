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

    // 1. 入力のパースと初期化
    const queries = [];
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n)) {
            queries.push(n);
        }
    }

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // 2. メモ化のための配列の初期化
    // memo[n] は n から 1 に到達するまでの手数を格納する
    // 64bit整数に収まるため、配列サイズは最大値に依存するが、ここではマップで管理する方が安全かつ効率的
    const memo = new Map<number, number>();
    memo.set(1, 0);

    // 3. 再帰/動的計画法による計算とメモ化
    function calculate_steps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps;
        if (n % 2 === 0) {
            // n が偶数なら n/2
            steps = calculate_steps(n / 2) + 1;
        } else {
            // n が奇数なら 3n+1
            steps = calculate_steps(3 * n + 1) + 1;
        }

        memo.set(n, steps);
        return steps;
    }

    // 4. 全クエリの処理と合計の計算
    let total_steps = 0;
    for (const n of queries) {
        // 各クエリに対して計算を実行し、結果を合計する
        // 再帰呼び出しでメモ化が機能するため、ここでは直接呼び出す
        total_steps += calculate_steps(n);
    }

    // 5. 結果の出力
    console.log(`total=${total_steps}`);
}

solve();
