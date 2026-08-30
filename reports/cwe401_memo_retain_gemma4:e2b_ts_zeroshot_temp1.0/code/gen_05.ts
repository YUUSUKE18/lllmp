/**
 * 仕様を満たすプログラム
 * アリストテレスの数列（コナーの予想に関連する操作）の反復回数を求める問題。
 * メモ化を使用して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を処理
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // 最初の要素をクエリとして処理
    const N = parseInt(lines[0], 10);
    
    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    let totalCount = 0;

    // 再帰関数（メモ化付き）
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let nextN: number;
        if (n % 2 === 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        // 再帰呼び出しとメモ化
        const steps = 1 + countSteps(nextN);
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリについて計算
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const n = parseInt(line, 10);

        if (isNaN(n) || n < 1) {
            continue; // 整数として解釈できない行や無効な値は無視
        }

        // 新しい数 n の到達までの手数を計算
        const result = countSteps(n);
        totalCount += result;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
