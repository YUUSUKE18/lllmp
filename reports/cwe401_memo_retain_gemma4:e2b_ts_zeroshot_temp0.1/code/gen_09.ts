/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n=1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * Node.js で動作する完全な TypeScript。
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
        // 整数として解釈を試みる
        if (!isNaN(parseInt(line, 10))) {
            n = parseInt(line, 10);
        } else {
            // 整数として解釈できない行は無視 (仕様に従う)
            continue;
        }

        if (n === 1) {
            // nが1のときの手数は0
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            // このクエリに対する手数は0
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const count = memo.get(n)!;
            totalCount += count;
            continue;
        }

        // 再帰的または反復的に計算
        let currentN = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (currentN !== 1) {
            if (path.has(currentN)) {
                // サイクルに陥った場合、この経路は1に到達しない（または無限ループ）
                // ただし、この問題の操作は通常1に収束するため、サイクル検出は厳密には不要だが、
                // メモ化の安全性を高めるために残しておく。
                // ここでは、サイクルに陥った場合は計算を打ち切る（実質的にエラーとして扱うか、問題の制約外と見なす）
                // ただし、この問題の操作はCollatz予想に基づいているため、1に収束すると仮定する。
                // サイクル検出は、もし問題が「到達可能か」を問うものであれば重要だが、ここでは「手数」を問うため、
                // サイクルに陥っても計算を続ける（ただし、メモ化で無限ループを防ぐ）。
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

        // 計算結果をメモ化
        // サイクル検出が成功し、1に到達した場合のみ記録
        if (currentN === 1) {
            memo.set(n, steps);
            totalCount += steps;
        } else {
            // 1に到達しなかった場合（サイクルに陥った場合）、このクエリは無視されるか、
            // あるいは問題の制約上、到達すると仮定される。
            // ここでは、到達しなかった場合は手数を加算しない（またはエラーとして扱う）。
            // Collatz予想に基づけば、到達すると仮定する。
            // 念のため、到達しなかった場合はメモ化しない。
        }
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
