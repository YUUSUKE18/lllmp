/**
 * 仕様に基づき、コナーの予想（3n+1問題）の操作回数を計算し、その合計を求めるプログラム。
 * メモ化（動的計画法/メモ化再帰）を用いて高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input.length === 0) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // スタック/キューとして処理するクエリのリスト
    const queries = lines.map(Number);

    // メモ化テーブル (Map)
    const memo = new Map<number, number>();
    memo.set(1, 0); // ベースケース: 1の手数は0

    let totalCount = 0;

    for (const n of queries) {
        if (n <= 0 || !Number.isInteger(n)) {
            continue; // 無効な入力は無視
        }

        // メモ化された結果があればそれを使用
        if (memo.has(n)) {
            totalCount += memo.get(n)!;
            continue;
        }

        // 計算のための再帰/反復処理（メモ化再帰形式を採用）
        let currentN = n;
        let steps = 0;
        const path = []; // パスを記録してメモ化に利用する

        // 1 に到達するまでの経路を辿る
        while (currentN !== 1) {
            if (currentN <= 0) {
                // 0や負の値に到達した場合は、このパスは無効（通常は発生しないが安全策）
                break;
            }

            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
            path.push(currentN);
        }

        if (currentN === 1) {
            // 1 に到達した場合、ステップ数を計算
            // 注意: この問題は、与えられたnから1に到達するまでの「手数」を求めるのではなく、
            // nが操作され続ける過程で、その操作回数を数える、という解釈が一般的です。
            // 仕様：「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
            // これは、nを操作して1になるまでの最小操作回数を意味します。

            // ここでは、nをスタート地点として、1に到達するまでの回数を計算する。
            // ただし、メモ化を最適化するため、再帰的なメモ化再帰（または単純な反復）が必要です。

            // 仕様に基づき、n -> ... -> 1 に到達するまでのステップ数を求める。
            // 既に Path が記録されているため、ステップ数は path.length
            // ただし、Pathの長さは (nから1になるまでの操作回数) ではない。
            // Pathは n, n', n'', ..., 1 の順序。
            // したがって、操作回数は Path.length - 1 または Path.length になる。

            // n=3 の場合: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回操作)
            // Pathの要素数は 8。操作回数は 7。
            
            if (path.length > 0) {
                 // 最初の要素 n から1までの操作回数は path.length - 1
                const stepsForN = path.length - 1;
                memo.set(n, stepsForN);
                totalCount += stepsForN;
            }
        }
    }

    // 最終的な合計を出力
    console.log(`total=${totalCount}`);
}

solve();
