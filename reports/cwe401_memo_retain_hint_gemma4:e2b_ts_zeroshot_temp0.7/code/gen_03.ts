/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * - 標準入力から整数クエリを読み込む。
 * - 各クエリ n について、nが偶数なら n/2、奇数なら 3n+1 を繰り返して 1 に到達するまでの手数を求める。
 * - n=1 の場合は手数は 0。
 * - 全クエリの手数の合計を求める。
 * - 計算結果をメモ化して高速化する。
 * - 標準出力に `total=<合計>` を出力する。
 * - 入力は整数として解釈でき、空行や不正な行は無視する。
 * - 64bit整数で処理する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n');
    let totalSteps = 0;

    // メモ化テーブル
    const memo: Map<number, number> = new Map();

    // 各行を処理
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
            continue; // 空行は無視
        }

        try {
            const n = parseInt(trimmedLine, 10);
            if (isNaN(n) || n < 1) {
                continue; // 整数として解釈できない、または 1 未満は無視
            }

            // メモ化された値があればそれを使用
            if (memo.has(n)) {
                const steps = memo.get(n)!;
                totalSteps += steps;
                continue;
            }

            // 1 に到達するまでの手数を計算
            let currentN = n;
            let steps = 0;

            while (currentN !== 1) {
                if (currentN === 1) break; // 安全策
                
                if (currentN % 2 === 0) {
                    currentN = currentN / 2;
                } else {
                    currentN = 3 * currentN + 1;
                }
                steps++;
            }

            // 計算結果をメモ化し、合計に加算
            memo.set(n, steps);
            totalSteps += steps;

        } catch (e) {
            // エラーが発生した場合（通常は意図しないが安全のため）
            // console.error(`Error processing line: ${line}`, e);
            continue;
        }
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
