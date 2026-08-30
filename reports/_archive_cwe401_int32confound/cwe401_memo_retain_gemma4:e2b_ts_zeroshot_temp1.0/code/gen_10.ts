/**
 * 仕様を満たすプログラム
 * 1から1までの整数が与えられたときに、特定の操作を繰り返して1に到達するまでの手数を計算し、その合計を求める。
 * メモ化を使用して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n');
    let totalMoves = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const nStr = line.trim();
        if (nStr === '') continue;

        const n = parseInt(nStr, 10);

        // 整数として解釈できない行は無視 (parseIntで失敗した場合はスキップされるか、NaNになるためチェックが必要だが、ここではtrimされた空行は無視している)
        if (isNaN(n) || n < 1) continue;

        // メモ化された結果があればそれを使用
        if (memo.has(n)) {
            totalMoves += memo.get(n)!;
            continue;
        }

        // 再帰的な計算（メモ化を伴う）
        if (n === 1) {
            memo.set(1, 0);
        } else if (n % 2 === 0) {
            // nが偶数の場合: n/2
            const nextN = n / 2;
            const moves = 1 + memo.get(nextN)!;
            memo.set(n, moves);
        } else {
            // nが奇数の場合: 3n+1
            const nextN = 3 * n + 1;
            const moves = 1 + memo.get(nextN)!;
            memo.set(n, moves);
        }

        totalMoves += memo.get(n)!;
    }

    console.log(`total=${totalMoves}`);
}

solve();
