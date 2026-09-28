/**
 * 仕様に基づき、コナーの予想（3n+1問題）の解法をメモ化して高速化したプログラム。
 * 標準入力からクエリを読み込み、各クエリの1への到達手数を計算し、その合計を出力する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を1行ごとに分割し、整数としてフィルタリングする
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(line => parseInt(line, 10));

    // メモ化のためのキャッシュ
    const memo = new Map<number, number>();
    memo.set(1, 0); // ベースケース: 1の手数は0

    /**
     * nが1になるまでの手数を再帰的に計算する関数（メモ化付き）
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
                // nが偶数なら n/2
                current = current / 2;
            } else {
                // nが奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 計算途中で現れる値が64bitに収まることを前提とする
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (isNaN(n) || n < 1) {
            // 整数として解釈できない行や1未満の値を無視する（仕様の解釈に基づき、ここでは無視する）
            continue;
        }
        
        // 各クエリについて手数を計算し、合計に加算する
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
