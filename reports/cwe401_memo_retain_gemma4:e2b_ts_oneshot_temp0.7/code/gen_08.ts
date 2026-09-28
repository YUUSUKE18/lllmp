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

    // 最初の行がクエリの開始値
    let n = parseInt(lines[0], 10);
    
    if (isNaN(n) || n < 1) {
        // 最初の入力が不正な場合はスキップ
        console.log("total=0");
        return;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();

    /**
     * 繰り返し操作の手数を計算する関数 (3n+1問題の解法)
     * @param start n の初期値
     * @returns 1 に到達するまでの手数
     */
    function countSteps(start: number): number {
        if (start === 1) {
            return 0;
        }
        if (memo.has(start)) {
            return memo.get(start)!;
        }

        let current = start;
        let steps = 0;
        
        // 3n+1問題の操作を繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 計算結果をメモ化
        memo.set(start, steps);
        return steps;
    }

    let totalSteps = 0;

    // 2行目以降のクエリを処理
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const n_query = parseInt(line, 10);

        if (isNaN(n_query) || n_query < 1) {
            continue;
        }

        // 各クエリについて、n_query から 1 に到達するまでの手数を計算する
        // 注: 問題文の解釈が重要です。「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
        // これは、n からスタートして、操作を繰り返して 1 に到達するまでのステップ数を求めることを意味します。
        const steps = countSteps(n_query);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
