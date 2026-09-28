import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    // 行ごとに分割し、整数としてパースする
    const lines = input.split('\n').filter(line => line.trim() !== '');
    
    // 処理対象のクエリ（整数）を格納する配列
    const queries: number[] = [];
    
    for (const line of lines) {
        const num = parseInt(line.trim(), 10);
        if (!isNaN(num) && num >= 1) {
            queries.push(num);
        }
    }

    // メモ化テーブル: 整数をキーとして、その値が1に到達するまでの手数を格納
    // 64bitの範囲を考慮し、数値計算には標準のNumber型を使用する。
    // Memoizationを適用するため、マップを使用する。
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * 与えられた数 n が 1 に到達するまでの手数を計算する関数
     * @param n 開始数
     * @returns 1 に到達するまでのステップ数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let count = 0;
        
        // 計算中に発生する値を記録する（メモ化のため）
        const path: number[] = [];

        while (current !== 1) {
            // 経路を記録（オプションだが、デバッグやメモ化の構造上役立つ）
            path.push(current);
            
            if (current % 2 === 0) {
                // n が偶数なら n/2
                current = Math.floor(current / 2);
            } else {
                // n が奇数なら 3n+1
                // ここで数値を扱う際に64bitの範囲を念頭に置く
                current = 3 * current + 1;
            }
            count++;
        }

        // 1 に到達したときのステップ数をメモ化
        memo.set(n, count);
        return count;
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
