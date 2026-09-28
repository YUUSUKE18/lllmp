import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            // 1以上の整数のみをクエリとして採用
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * n から 1 に到達するまでの手数を計算する（メモ化付き）
     * @param n 現在の数
     * @returns 手数
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
        
        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                // n が偶数なら n/2
                current /= 2;
            } else {
                // n が奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 結果をメモ化して返す
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して計算を実行し、合計を求める
    for (const n of queries) {
        totalSteps += countSteps(n);
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
