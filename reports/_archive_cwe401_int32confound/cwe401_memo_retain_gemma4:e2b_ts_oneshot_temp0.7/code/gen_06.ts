const fs = require('fs');

function solve() {
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

    // 各クエリを読み込む
    const queries = lines.map(line => parseInt(line, 10));

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    let totalSteps = 0;

    /**
     * 置き換え操作を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        
        // 1 に到達するまでのパスを追跡し、メモ化する
        const path = new Map<number, number>();
        path.set(n, 0);

        while (current !== 1) {
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            path.set(current, path.get(current) || steps + 1);
            steps++;
            
            // 安全策として、無限ループや非常に大きな数への対策（今回は1に到達することを前提とする）
            if (steps > 100000) { 
                // このケースは通常発生しないはずだが、念のため
                break;
            }
        }

        // 1に到達したときのステップ数を計算し、パス全体をメモ化する
        const finalSteps = path.get(1) || -1;
        if (finalSteps !== -1) {
            // パス全体を再帰的に計算してメモ化する（より厳密なメモ化のため）
            // ここでは、再帰的に呼び出すのではなく、現在のパスをメモ化する方式を採用する。
            // 実際には、この問題は「各クエリに対して計算し、その結果を合計する」のではなく、「全てのクエリの計算結果を合計する」という構造なので、
            // 順次計算しながらメモ化するのが最も効率的。
            memo.set(n, steps);
        } else {
             // 念のため、ループで計算したステップ数を設定
             memo.set(n, steps);
        }

        return steps;
    }

    // 全てのクエリに対して計算と合計を行う
    for (const n of queries) {
        if (n < 1) continue; // 1以上の整数のみを対象
        
        // メモ化を利用して計算
        let current = n;
        let steps = 0;
        
        // 経路計算
        while (current !== 1) {
            if (memo.has(current)) {
                steps += memo.get(current)!;
                current = 1; // 既に1に到達したと仮定
                break;
            }
            
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 最終的なステップ数をメモ化
        memo.set(n, steps);
        totalSteps += steps;
    }

    // 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
