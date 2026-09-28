const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split(/\s+/).filter(line => line.length > 0);
    
    // メモ化のためのマップ
    const memo: Map<number, number> = new Map();
    let totalSteps = 0;

    /**
     * 迷路問題の計算関数 (3n+1問題)
     * @param n 開始値
     * @returns 1 に到達するまでの手数
     */
    function slowAndFast(n: number): number {
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
                // n が偶数なら n/2
                current = current / 2;
            } else {
                // n が奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 計算過程でMemoize
        // ただし、この問題は「1に到達するまでの手数」を求めるため、
        // 逆方向（1からnへ）または再帰的な構造を考えて、直接的な計算ではなく、
        // 実行されたパスの長さを数える必要があります。
        // ここでは、与えられたルールに従って計算し、その過程をメモ化します。
        
        // 実際には、この問題は「nから1への最短経路」を求める問題であり、
        // 3n+1問題の標準的な解法（再帰/メモ化）を適用します。
        // しかし、指示は「nが偶数ならn/2、奇数なら3n+1に置き換える操作を繰り返し、1に到達するまでの手数を求めよ」なので、
        // 逆方向（1からnへ）ではなく、与えられた操作を順に行う必要があります。
        // 1に到達するまでの手数を求めるため、これは通常の3n+1問題の計算になります。
        
        // 厳密に「nから1への操作の回数」を求めるため、計算を順に行います。
        // 1に到達するまでの手数を求めるため、memo化は再帰的に行う方が効率的ですが、
        // ここでは直接的な計算をメモ化します。
        
        // 警告: 3n+1問題の典型的な解法は、nから1へのパスを探索することです。
        // ここで求められているのは、与えられた操作を繰り返した結果が1になるまでの回数です。
        // 例: n=7 -> 22 -> 11 -> 34 -> 17 -> 52 -> 26 -> 13 -> 40 -> 20 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (16回)
        
        // 実際には、この問題は「nが1になるまで操作を繰り返す」という手順を数えるため、
        // 順方向の計算（上記ループ）が正しい解法です。
        
        memo.set(n, steps);
        return steps;
    }

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (Number.isNaN(n)) continue;

        if (n >= 1) {
            const steps = slowAndFast(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
