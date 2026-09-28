/**
 * 仕様: 
 * 標準入力から与えられたクエリ n に対して、nが偶数ならn/2、奇数なら3n+1を繰り返して1に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 
 * 入力処理: 標準入力から1行ずつ整数を読み込む。
 * 出力: total=<合計> を標準出力に出力する。
 * 言語: TypeScript, Node.js。
 */

function solve() {
    const fs = require('fs');

    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input.length === 0) {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 0) {
            const num = parseInt(trimmedLine, 10);
            // 1以上の整数のみを格納
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    let totalCount = 0;

    /**
     * 繰り返し操作の手数を計算する関数 (メモ化付き)
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
                // n が偶数なら n/2
                current = Math.floor(current / 2);
            } else {
                // n が奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 途中で計算結果が非常に大きくなる可能性があるため、64bit整数 (JavaScriptのNumber型) を使用する。
        // 問題文の制約に基づき、結果が64bitに収まることを前提とする。
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して手数を計算し、合計を求める
    for (const n of queries) {
        totalCount += countSteps(n);
    }

    // 結果を出力
    console.log(`total=${totalCount}`);
}

solve();
