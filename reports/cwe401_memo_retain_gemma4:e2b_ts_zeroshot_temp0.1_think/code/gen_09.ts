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
    const queries = lines
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => parseInt(line, 10))
        .filter(n => !isNaN(n) && n >= 1);

    // 計算結果のメモ化 (n -> 手数)
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * 与えられた数 n から 1 に到達するまでの手数を計算する
     * @param n 開始数
     * @returns 手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        
        // サイクル検出のためのセット（無限ループ防止、ただしCollatzでは1に収束することが期待される）
        // 今回は、Memoizationが効くため、サイクル検出は必須ではないが、安全のため考慮する。
        // ただし、Memoizationが正しく機能すれば、計算自体は高速化される。

        while (current !== 1) {
            if (current <= 0) {
                // 負の数やゼロが発生した場合の処理（Collatzでは通常発生しないが、安全のため）
                // この問題の制約上、n >= 1なので、通常は発生しないはず。
                break; 
            }
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                // 3n + 1 の計算。64bit整数に収まることを前提とする。
                current = 3 * current + 1;
            }
            steps++;
        }

        // 結果をメモ化
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して計算を実行し、合計を求める
    for (const n of queries) {
        const steps = calculateSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
