import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、空行や非整数行を無視して整数配列にする
    const lines = input.split('\n');
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            // 整数として解釈できるか試みる
            const num = Number(trimmedLine);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル: { n: steps }
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * n から 1 に到達するまでの手数を計算する関数
     * @param n 開始値
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

        // 1 に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                // n が偶数なら n/2
                current /= 2;
            } else {
                // n が奇数なら 3n+1
                // BigIntを使用しない場合、3n+1が非常に大きくなる可能性があるため、
                // 64bitの範囲を考慮しつつ、標準のNumber型で計算を進める。
                // ただし、問題の制約に従い、計算結果が64bitに収まることを前提とする。
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
        totalSteps += countSteps(n);
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
