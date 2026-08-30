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

    // 読み込んだ整数列
    const queries = lines.map(s => parseInt(s, 10)).filter(n => !isNaN(n) && n >= 1);

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化のためのマップ
    const memo: Map<number, number> = new Map();
    memo.set(1, 0);

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を求める（メモ化付き）
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;

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

        // キャッシュに保存
        // 逆方向の計算（n -> 1）ではなく、順方向の計算をそのまま使う。
        // ただし、この問題の操作は「n から n/2 または 3n+1」であり、逆操作（n/2 または (n-1)/3）が複雑になるため、
        // 実際には順方向の計算を繰り返すのが最も単純で、メモ化はこの順方向の計算の結果を保存する。
        // 問題文の意図は「n から操作を繰り返して1に到達する手数」なので、このシミュレーションで正しい。
        
        // 念のため、逆操作でのメモ化も考慮する（ただし、今回は順方向で十分）
        // 最終的に求めたいのは、与えられた数 n から 1 に到達するまでのステップ数。
        
        // ここでは、クエリごとに個別に計算し、memoは現在の計算経路での重複を避けるために使う。
        // ただし、今回の仕様は「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」なので、
        // これは通常、Collatz命題のステップ数を求める問題であり、nを操作して1に到達するパスの長さを求める。
        
        // 最初に試した計算をそのまま採用する。
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const n of queries) {
        // 各クエリに対してステップ数を計算
        // 注: この問題設定では、各クエリが独立しており、メモ化は同じ数に対する計算結果を共有するために行われる。
        // 実際には、クエリの数が多く、同じ数が繰り返される場合にメモ化が有効となる。
        const steps = countSteps(n);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
