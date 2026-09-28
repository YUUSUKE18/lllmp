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

    // 状態をメモ化するためのマップ
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * 変換操作を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
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
        
        // 1に到達するまでのステップを計算
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 途中の計算結果もメモ化する（後続のクエリのために）
        // ただし、この問題の要求は「各クエリ n について、n が 1 に到達するまでの手数を求める」なので、
        // ここでは n から 1 への経路を計算し、そのステップ数をメモ化するのが最も直接的です。
        
        // 最初の計算結果をメモ化
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリについて計算し、合計を求める
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            // 各クエリ n について、n から 1 への手数を計算する
            // 提示された仕様は「各クエリ n について、n が 1 に到達するまでの手数を求めます」であり、
            // n が1になるまでの操作を繰り返す、というプロセスを指していると解釈します。
            // 提示された例（Collatz問題の一般的な文脈）に基づき、n から 1 へのステップ数を計算します。
            
            // 注意: 質問文の記述「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
            // は、Collatz数列のステップ数を尋ねる操作を指しています。
            
            // メモ化された値を利用して合計を計算
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
