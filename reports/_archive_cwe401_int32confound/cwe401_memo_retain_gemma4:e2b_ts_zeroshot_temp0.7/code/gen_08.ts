/**
 * 仕様に基づき、Collatz予想（3n+1問題）の繰り返し操作の手数を計算し、その合計を求めるプログラム。
 * メモ化を使用して高速化する。
 */

function solve() {
    const fs = require('fs');

    // 標準入力から全データを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を1行ごとに分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            // 1 以上の整数であるか確認
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブルの初期化
    const memo: Map<number, number> = new Map();
    let totalCount: bigint = 0n;

    /**
     * Collatz操作の繰り返し回数を計算する関数（メモ化付き）
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const steps: number[] = [];
        
        // 繰り返し計算とメモ化
        while (current !== 1) {
            // 現在の値を記録しておく（後で再帰的に計算する際に利用するため、ここでは単に操作を追う）
            steps.push(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                // 3n + 1
                current = 3 * current + 1;
            }
        }
        
        // 1に到達するまでのステップ数は、現在のステップ数 + 1 (最後の1への到達)
        // ただし、問題の定義は「nが1のときの手数は0」なので、nから1に到達するまでの操作回数としてカウントする。
        // 実際には、n -> ... -> 1 に到達するまでの操作回数を数える。
        // ここでは、nからスタートして1に到達するまでの操作回数を数える。
        let count = 0;
        let temp = n;
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp /= 2;
            } else {
                temp = 3 * temp + 1;
            }
            count++;
        }

        // 経路上のすべての数値のメモ化（オプションだが、より一般的なメモ化戦略）
        // 今回の仕様は「nから1への手数」なので、n自体をキーとしてステップ数を格納する。
        memo.set(n, count);
        return count;
    }

    // すべてのクエリに対して計算と合計を行う
    for (const n of queries) {
        // nがすでにメモ化されているか確認
        if (!memo.has(n)) {
            const steps = countSteps(n);
        } else {
            const steps = memo.get(n)!;
        }
        
        totalCount += BigInt(steps);
    }

    // 結果を出力
    console.log(`total=${totalCount.toString()}`);
}

solve();
