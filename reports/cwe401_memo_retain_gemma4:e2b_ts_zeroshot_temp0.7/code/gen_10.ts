/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力からクエリを読み込み、
 * n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n が 1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * 
 * 言語・形式:
 * Node.js で動く完全な TypeScript。外部パッケージ不使用。
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
        const trimmedLine = line.trim();
        if (trimmedLine === "") continue;

        let n: number;
        try {
            n = parseInt(trimmedLine, 10);
            if (isNaN(n) || n < 1) continue; // 1以上の整数でない場合は無視
        } catch (e) {
            continue; // パースエラーは無視
        }

        if (n === 1) {
            // nが1のときの手数は0
            // memo.set(1, 0); // 1の場合は0なので明示的にセットしても良いが、ここでは計算プロセスに任せる
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalMoves += memo.get(n)!;
            continue;
        }

        // メモ化されていない場合、計算とメモ化
        let currentN = n;
        let moves = 0;
        const history = new Set<number>(); // サイクル検出用

        while (currentN !== 1) {
            if (history.has(currentN)) {
                // サイクルに陥った場合、この経路は無限ループ（または非効率）だが、
                // この問題は1に到達することを前提としているため、サイクル検出は厳密には不要だが、
                // メモ化の目的のために、到達した時点でループを抜ける（またはエラー処理）
                // ただし、この問題では通常、ゴールに到達するはず。
                // サイクル検出は通常、手数を求める問題で無限ループを防ぐために重要だが、
                // 1に収束する問題では不要な場合もある。
                // ここでは、もしサイクルに陥っても、計算が収束することを期待する。
                // サイクル検出は、通常、手数を求める際の「最小ステップ」を求める場合に重要になる。
                // 単純なステップカウントの場合は、既に訪れた値を再計算するのを防ぐためにメモ化が主目的。
                // 今回は、計算過程で既にmemoに格納されているかを確認する。
                break; 
            }

            history.add(currentN);

            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            moves++;
        }

        // 最終的な手数をメモ化し、合計に加算
        // サイクル検出が不要な場合、直接計算結果をセットする
        memo.set(n, moves);
        totalMoves += moves;
    }

    console.log(`total=${totalMoves}`);
}

solve();
