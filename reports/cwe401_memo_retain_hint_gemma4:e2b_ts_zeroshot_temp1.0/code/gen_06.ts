/**
 * 仕様に基づき、コナーの予想（3n+1問題）の解法をメモ化して高速化するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log("total=0");
        return;
    }

    // 入力処理: 空行や非整数行を無視して、整数クエリを抽出する
    const queries: number[] = [];
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    let totalCount = 0;

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
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
        let steps = 0;

        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // メモ化
        memo.set(n, steps);
        return steps;
    }

    // 全てのクエリについて計算と合計を求める
    for (const n of queries) {
        totalCount += countSteps(n);
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
