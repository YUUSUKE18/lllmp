/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを読み込み、
 * n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n が 1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * 
 * 言語・形式: Node.js で動く完全な TypeScript。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount: bigint = 0n;

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
            // n が 1 のときの手数は 0
            const count = 0;
            totalCount += BigInt(count);
            // メモ化
            memo.set(1, 0);
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            const count = memo.get(n)!;
            totalCount += BigInt(count);
            continue;
        }

        // 再帰的計算とメモ化 (または反復計算)
        let steps = 0;
        let currentN = n;
        const path: number[] = []; // 経路を記録してメモ化に利用する

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 既に計算済みの値に到達した場合、その結果を足し合わせる
                steps += memo.get(currentN)!;
                break;
            }
            
            path.push(currentN);
            
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }
        
        // 最終的な結果を計算し、経路上のすべてのステップをメモ化する
        // ここでの「手数」は、nから1に到達するまでの操作回数。
        // 経路上の各ステップの「手数」を合計する必要がある。
        // 仕様の解釈: 「n が 1 に到達するまでの手数を求めます。」
        // これは、n -> ... -> 1 に到達するまでの操作回数 (ステップ数) を意味すると解釈する。
        
        // 再計算してステップ数を求める（メモ化された値を使う方が効率的だが、ここでは経路を辿る）
        let finalSteps = 0;
        let tempN = n;
        const history: number[] = [n];

        while (tempN !== 1) {
            if (memo.has(tempN)) {
                finalSteps += memo.get(tempN)!;
                break;
            }
            
            if (tempN % 2 === 0) {
                tempN = tempN / 2;
            } else {
                tempN = 3 * tempN + 1;
            }
            history.push(tempN);
        }
        
        // 1に到達した後のステップ数 (n -> 1 の操作回数) を計算する
        // 経路上の各ステップの「手数」を合計する、という指示を再解釈する。
        // 通常のCollatz問題では、nから1に到達するまでのステップ数を求める。
        // ここでは、nから1に到達するまでの操作回数 (steps) を求める。
        
        let currentSteps = 0;
        let current = n;
        const pathForSteps: number[] = [];

        while (current !== 1) {
            pathForSteps.push(current);
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            currentSteps++;
        }
        
        // nから1に到達するまでの手数は currentSteps
        const finalCount = currentSteps;
        totalCount += BigInt(finalCount);

        // 経路上のすべての値をメモ化する（これは、同じ値が何度も現れるため）
        // ただし、メモ化は「nから1への最短経路」の計算結果を保存する形が最も効率的。
        // ここでは、nから1への到達ステップ数を保存する。
        memo.set(n, finalCount);
    }

    console.log(`total=${totalCount.toString()}`);
}

solve();
