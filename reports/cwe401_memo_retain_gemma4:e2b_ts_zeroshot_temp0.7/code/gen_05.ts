/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対し、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n=1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 同じ整数が繰り返し現れるので、計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * Node.js で動作する完全な TypeScript。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === "") {
        console.log("total=0");
        return;
    }

    // 最初の行がクエリの数、または最初の値である可能性があるが、仕様から「1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」とあるため、
    // 入力全体を処理する。

    let totalCount = 0;
    const memo = new Map<number, number>();

    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") continue;

        let n: number;
        try {
            n = parseInt(trimmedLine, 10);
        } catch (e) {
            // 整数として解釈できない行は無視
            continue;
        }

        if (isNaN(n) || n < 1) {
            continue;
        }

        if (n === 1) {
            // n が 1 のときの手数は 0
            totalCount += 0;
            continue;
        }

        // メモ化された値があるか確認
        if (memo.has(n)) {
            totalCount += memo.get(n)!;
            continue;
        }

        // 再帰的または反復的に計算
        let count = 0;
        let currentN = n;
        const path = new Set<number>(); // サイクル検出用

        while (currentN !== 1) {
            if (path.has(currentN)) {
                // サイクルに陥った場合、このパスは1に到達しない（無限ループ）と見なすか、
                // 問題の文脈（Collatz問題の変形）では通常発生しないが、安全のため処理を中断する。
                // ただし、この問題は「1に到達するまでの手数」を問うているため、サイクルは到達不可能を意味する。
                // ここでは、到達不可能として処理を終了する（実際には到達しないため、このパスのカウントは無視する、またはエラーとする）。
                // Collatz問題では、サイクルに陥った場合は通常、そのサイクル内の手数で評価されるが、ここでは1到達がゴール。
                // サイクル検出は、到達不可能を意味する。
                break; 
            }

            // メモ化された値から再計算する
            path.add(currentN);
            
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            count++;
        }

        // 計算結果をメモ化
        // サイクル検出が機能しなかった場合（到達不可能）、ここでは計算されたcountを格納する。
        // サイクル検出は、無限ループを避けるための安全策。
        memo.set(n, count);
        totalCount += count;
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
