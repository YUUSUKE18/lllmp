/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から1以上の整数が1行に1個ずつ与えられる。
 * 各クエリ n について、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * nが1のときの手数は0。
 * すべてのクエリの手数の合計を求める。
 * 標準出力へ `total=<合計>` を出力する。
 * 同じ整数が繰り返し現れるので、計算結果をメモ化して高速化する。
 * 入力には空行や整数として解釈できない行は無視する。
 * 計算結果は64bit整数に収まる。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
        return;
    }

    // 入力から整数を抽出
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
        console.log('total=0');
        return;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    let totalCount = 0;

    /**
     * 繰り返し操作の手数を計算する関数 (メモ化付き)
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

        let steps = 0;
        let current = n;
        
        // 1に到達するまでの手数を計算
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 計算結果をメモ化
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して計算と合計を求める
    for (const n of queries) {
        totalCount += countSteps(n);
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
