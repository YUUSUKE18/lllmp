/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、
 * nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * nが1のときの手数は0。
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

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo = new Map<number, number>();
    let totalCount = 0;

    for (const line of lines) {
        let n: number;
        try {
            n = parseInt(line, 10);
            if (isNaN(n) || n < 1) {
                continue; // 整数として解釈できない行や1未満の数を無視
            }
        } catch (e) {
            continue; // エラーが発生した場合は無視
        }

        if (n === 1) {
            // nが1のときの手数は0
            const count = 0;
            if (!memo.has(n)) {
                memo.set(n, count);
            }
            totalCount += count;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalCount += memo.get(n)!;
            continue;
        }

        // 再帰/メモ化再帰で計算
        let steps = 0;
        let currentN = n;
        const path = new Set<number>(); // サイクル検出用

        while (currentN !== 1) {
            if (path.has(currentN)) {
                // サイクルに陥った場合、これは問題の性質上発生しないはずだが、安全のため
                // ここでは、サイクルが発生した場合は計算を停止し、その経路のコストを無視するか、エラーとする。
                // ただし、この問題は通常、1に到達するためサイクルは発生しない（Collatz conjectureの性質）。
                // 念のため、無限ループを防ぐために、到達した値が既に計算中であれば、その経路のコストは無視する（ここでは一旦無視）。
                break; 
            }
            
            path.add(currentN);

            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 1に到達したか、または計算が終了したかを確認
        if (currentN === 1) {
            // 1に到達したときのステップ数を記録
            memo.set(n, steps);
            totalCount += steps;
        } else if (path.size > 0) {
            // サイクルに陥った場合（理論上は発生しないはずだが、念のため）
            // サイクル内の値は計算を停止する。
            // この問題の文脈では、1に到達しない場合は通常、計算が失敗したと見なされるが、
            // 厳密には「1に到達するまでの手数」を求めよ、という指示なので、到達しない場合はそのクエリは無視されるか、
            // サイクルを検出した時点でその経路のコストを計算しない。
            // ここでは、サイクル検出時に計算を終了する。
        }
    }

    console.log(`total=${totalCount}`);
}

solve();
