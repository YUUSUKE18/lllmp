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

    // 1. 入力の読み込みと初期化
    let currentN = parseInt(lines[0], 10);
    let totalSteps = 0;
    
    // メモ化のためのマップ
    const memo = new Map<number, number>();

    /**
     * 繰り返し操作を1に到達するまでの手数を計算する関数 (メモ化付き)
     * @param n 現在の数
     * @returns 1に到達するまでの手数
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
        
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 経路上のすべての値のメモ化（これは問題の意図からすると、各クエリの計算結果を求めるのではなく、
        // 1からnまでの経路を追跡するのではなく、単にnから1への経路の長さを求めることが求められていると解釈する。
        // しかし、「すべてのクエリの手数の合計を求めます」という指示と「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」という指示から、
        // 各クエリ n に対して countSteps(n) を計算し、その合計を求めるのが最も自然である。
        // したがって、ここでは n から 1 への直接のステップ数を計算する。
        
        memo.set(n, steps);
        return steps;
    }

    // 2. 各クエリの処理と合計の計算
    for (let i = 1; i < lines.length; i++) {
        const n = parseInt(lines[i], 10);
        if (isNaN(n) || n < 1) continue;

        // 各クエリ n について、n から 1 への手数を計算する
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 3. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
