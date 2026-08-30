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
    const memo: Map<number, number> = new Map();
    let totalCount = 0;

    for (const line of lines) {
        let n: number;
        // 整数として解釈を試みる
        if (!isNaN(parseInt(line, 10))) {
            n = parseInt(line, 10);
        } else {
            // 整数として解釈できない行は無視
            continue;
        }

        if (n === 1) {
            // n=1 のときの手数は 0
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            // このクエリに対する手数を加算
            totalCount += memo.get(1)!;
            continue;
        }

        // 再帰的または反復的に計算し、メモ化を利用する
        let steps = 0;
        let currentN = n;
        const path: number[] = []; // 経路を記録してメモ化を効率的に行うため（今回は直接メモ化で十分だが、経路追跡も考慮）

        // 1 に到達するまでの手数を計算
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                steps += memo.get(currentN)!;
                break;
            }
            
            // 経路を記録し、無限ループを防ぐための安全策（今回は1に収束するため不要だが、一般論として）
            path.push(currentN);

            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }
        
        // 1 に到達したときのステップ数をメモ化
        // 経路上のすべての値について、1に到達するまでのステップ数を計算し、それを合計する
        // ここでの「手数」は、元の n から 1 に到達するまでの操作回数である。
        
        // 再計算してメモ化を更新する（より正確なメモ化のため）
        let currentSteps = 0;
        let tempN = n;
        const history: number[] = [];
        
        // 経路を辿りながら、メモ化された値を利用する
        while (tempN !== 1) {
            if (memo.has(tempN)) {
                currentSteps += memo.get(tempN)!;
                break;
            }
            
            history.push(tempN);

            if (tempN % 2 === 0) {
                tempN = tempN / 2;
            } else {
                tempN = 3 * tempN + 1;
            }
            currentSteps++;
        }
        
        // 1に到達したときのステップ数をメモ化
        // 経路上のすべての値について、1に到達するまでのステップ数を計算し、それを合計する
        // この問題は、各 n について「nから1への操作回数」を求める問題であり、
        // 経路上の各ステップでメモ化された値を利用して計算する。
        
        // 経路上の各ステップで、その時点での値が既に計算済みであればその結果を利用する。
        // 最終的に n から 1 への操作回数を求める。
        
        // 経路を辿りながら、各ステップでメモ化された値を利用して、n から 1 への操作回数を計算する。
        let finalSteps = 0;
        let current = n;
        const pathForN: number[] = [];

        while (current !== 1) {
            if (memo.has(current)) {
                finalSteps += memo.get(current)!;
                break;
            }
            
            pathForN.push(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // 1に到達したときのステップ数をメモ化
        // 経路上のすべての値について、1に到達するまでのステップ数を計算し、それを合計する
        // この問題は、各 n について「nから1への操作回数」を求める問題であり、
        // 経路上の各ステップでメモ化された値を利用して計算する。
        
        // 最終的な手数をメモ化
        memo.set(n, finalSteps);
        totalCount += finalSteps;
    }

    console.log(`total=${totalCount}`);
}

solve();
