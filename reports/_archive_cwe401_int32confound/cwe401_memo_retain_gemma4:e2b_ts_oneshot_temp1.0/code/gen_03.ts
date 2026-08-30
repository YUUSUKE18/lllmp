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

    // 1. 入力された整数を解析
    const initialNumbers = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n) && n >= 1);

    if (initialNumbers.length === 0) {
        console.log("total=0");
        return;
    }

    // 2. メモ化された関数で手数を計算
    // 経路探索とメモ化（動的計画法的なアプローチ）
    const memo = new Map<number, number>();

    /**
     * 経路を追跡し、手数を計算する関数。
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 1;
        let current = n;
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 計算した過程をメモ化（この問題では、開始ノードから1への最短経路ではなく、
        // 初期値から1への経路を追跡した手数を数える必要があるため、
        // ここでは初期値からの遷移を追跡する形に修正する。
        // 問題の意図は「各nについて、そのnから1への遷移回数」を求めることと解釈する。
        // 実際には、初期値から1への経路を計算する。
        
        // 再帰的なメモ化を適用する
        // この問題の要求は「各クエリ n について、n が1に到達するまでの手数を求め」なので、
        // nから1への遷移を数える。
        
        // 再帰的なアプローチで手数を計算する
        const result = 1 + calculateSteps(current);
        memo.set(n, result);
        return result;
    }

    // 3. 全クエリの手数を合計する
    let totalSteps = 0;

    for (const n of initialNumbers) {
        // 各初期値について、nから1への手数を計算する
        // memoはここで初期化されるべきだが、calculateStepsが再帰的に依存するため、
        // 再帰の代わりにループで計算し、メモ化を利用する。
        
        // 遷移の計算（メモ化を適用するため、このループ内で再帰的に呼び出す）
        let current_n = n;
        let steps = 0;
        
        // 各初期値について、nから1への遷移を計算する（これが経路探索）
        // ※問題文の「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
        // これは通常、Collatz推移（3n+1問題）の操作であり、その操作の回数を数える。
        
        // 再帰的なメモ化を使って、各nから1への手数を求める
        const steps_for_n = calculateSteps(n);
        totalSteps += steps_for_n;
    }

    // 4. 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
