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

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    let totalSteps = 0;

    // 繰り返し操作の関数
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 1 + countSteps(n % 2 === 0 ? n / 2 : 3 * n + 1);
        memo.set(n, steps);
        return steps;
    }

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        // 各クエリに対する手数を計算し、合計に加算する
        // 注意: 課題の記述「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
        // これは、単一の数 n から 1 に到達するまでの操作回数を求める問題（コナーの問題）と解釈します。
        // 繰り返し操作の「手数」を求めるため、再帰的な深さを計算します。
        const steps = countSteps(n);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
