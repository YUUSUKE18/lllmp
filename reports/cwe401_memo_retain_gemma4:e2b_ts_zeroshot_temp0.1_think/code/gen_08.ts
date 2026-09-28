import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、各行を整数としてパースする
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    const queries: number[] = [];
    for (const line of lines) {
        const num = parseInt(line, 10);
        // 整数として解釈できない行は無視する（filterで既に処理済みだが念のため）
        if (!isNaN(num)) {
            queries.push(num);
        }
    }

    // メモ化テーブル: { n: steps }
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * n から 1 に到達するまでの手数を計算する関数
     * メモ化を利用する
     * @param n 開始数
     * @returns 手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const steps = 0;

        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                // n が偶数なら n/2
                current /= 2;
            } else {
                // n が奇数なら 3n+1
                // 64bitの範囲に収まることを前提とする
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
