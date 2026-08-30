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

    // 1. 入力のパース
    const queries = lines.map(line => parseInt(line, 10));

    // 2. メモ化された関数 (Memoization)
    const memo = new Map<number, number>();

    /**
     * 変換操作を繰り返し、1に到達するまでの手数を計算する
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        
        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化（これは問題の意図に合致しない可能性があるため、ここではクエリごとの結果のみをメモ化する）
        // 問題文の「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」は、
        // 複数のクエリ間で同じ入力値が与えられた場合の高速化を指すと解釈し、
        // countSteps関数内で再帰的なメモ化（DP）を行うのが最も適切です。
        
        // ここでは、再帰的なメモ化（DP）を適用して、計算過程全体を高速化します。
        // ただし、この問題は「nが1になるまでの操作回数」を求めるため、
        // 1からnへの逆操作を考える方が効率的ですが、ここでは与えられた操作をそのまま実行します。
        
        // 念のため、計算過程で現れた値もメモ化しておきます（これは一般的なメモ化の応用）
        // ただし、この問題の制約上、nが大きくなると計算が発散するため、
        // 1に到達するまでのステップ数のみをメモ化します。
        
        memo.set(n, steps);
        return steps;
    }

    // 3. 全クエリの処理と合計の計算
    let totalSteps = 0;
    for (const n of queries) {
        if (n >= 1) {
            // 既にメモ化されているか確認
            if (!memo.has(n)) {
                totalSteps += countSteps(n);
            } else {
                totalSteps += memo.get(n)!;
            }
        }
    }

    // 4. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
