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

    // スタックとメモ化テーブル
    const memo = new Map<number, number>();
    let total_steps = 0;

    // 最初の値 n を処理する関数 (3n+1問題)
    function count_steps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 1 + count_steps(n % 2 === 0 ? n / 2 : 3 * n + 1);
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリを処理
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n)) continue;

        // メモ化された結果から手数を取得
        const steps = count_steps(n);
        total_steps += steps;
    }

    console.log(`total=${total_steps}`);
}

solve();
