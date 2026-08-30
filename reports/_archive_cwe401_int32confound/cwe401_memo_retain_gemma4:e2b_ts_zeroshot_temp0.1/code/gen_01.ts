/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを読み込み、
 * nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * nが1のときの手数は0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * Node.jsで動作する完全なTypeScript。
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
    const memo: Map<number, number> = new Map();
    let totalCount: bigint = 0n;

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
            memo.set(1, count);
            totalCount += BigInt(count);
            continue;
        }

        // 再帰的または反復的に計算し、メモ化を利用する
        let steps = 0;
        let currentN = n;
        const path: number[] = []; // 経路を記録してメモ化を効率的に行うため（今回は直接計算で十分だが、再帰的な構造を模倣）

        // 1に到達するまでの手数を計算
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // メモがあればそこから計算を終了
                steps += memo.get(currentN);
                break;
            }
            
            // 経路を記録し、無限ループを防ぐための安全策（ただし、この問題の操作は必ず1に収束するため不要かもしれないが、念のため）
            path.push(currentN);

            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 1に到達したときのステップ数を計算し、経路上のすべてのステップをメモ化する
        // ここでは、nから1に到達するまでの「手数」を求めるため、
        // 経路上の各ステップでの「残り手数」を計算するのではなく、
        // nから1に到達するまでの総ステップ数を求める。

        // 経路を遡って手数を計算し、メモ化を更新する
        let currentSteps = 0;
        let tempN = n;
        const history: { [key: number]: number } = {}; // 経路上の各値とその到達までの手数を記録

        // 経路を辿り、メモ化を更新する
        while (tempN !== 1) {
            if (memo.has(tempN)) {
                // 既に計算済みの値に到達した場合、その手数を加算して終了
                currentSteps += memo.get(tempN);
                break;
            }
            
            // 経路を記録
            history[tempN] = 0; // 初期値
            
            if (tempN % 2 === 0) {
                tempN = tempN / 2;
            } else {
                tempN = 3 * tempN + 1;
            }
            currentSteps++;
        }
        
        // 最終的な手数を計算し、経路上のすべての値のメモ化を更新する
        // この問題は「nから1に到達するまでの手数」を求めるため、
        // 経路上の各ステップでの「残り手数」を計算するのではなく、
        // nから1に到達するまでの総ステップ数を求める。
        
        // 再帰的なメモ化（DP）で再計算する方が安全で効率的
        
        // 再帰的なメモ化（DP）で再計算
        const calculateSteps = (num: number): number => {
            if (num === 1) return 0;
            if (memo.has(num)) return memo.get(num)!;

            let result;
            if (num % 2 === 0) {
                result = 1 + calculateSteps(num / 2);
            } else {
                result = 1 + calculateSteps(3 * num + 1);
            }
            
            memo.set(num, result);
            return result;
        };

        const finalSteps = calculateSteps(n);
        totalCount += BigInt(finalSteps);
    }

    console.log(`total=${totalCount.toString()}`);
}

solve();
