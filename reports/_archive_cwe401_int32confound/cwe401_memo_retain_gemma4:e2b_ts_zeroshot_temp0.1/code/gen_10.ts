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
 * 
 * 言語・形式: Node.jsで動く完全なTypeScript。
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
            // 整数として解釈できない行は無視 (仕様に従う)
            continue;
        }

        if (n === 1) {
            // nが1のときの手数は0
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            // 既に計算済みなら加算
            totalCount += memo.get(1)!;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalCount += memo.get(n)!;
            continue;
        }

        // 再帰的または反復的に計算
        let steps = 0;
        let currentN = n;
        const path: number[] = []; // 経路を記録してメモ化に利用する

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 途中からメモ化された値があれば、そこから計算を終了
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

        // 1に到達した後のステップ数を計算し、経路を遡ってメモ化する
        if (currentN === 1) {
            // 1に到達するまでの総ステップ数を計算
            let finalSteps = 0;
            let tempN = n;
            
            // 経路を逆順に処理してステップ数を計算
            for (let i = path.length - 1; i >= 0; i--) {
                const prevN = path[i];
                let nextN: number;
                
                // 逆操作を考える (n -> n/2 または n -> (n-1)/3)
                // 逆操作は複雑なので、ここでは単純に順方向に計算したステップ数を記録する
                // 経路を記録した時点で、nから1までのステップ数は path.length になる
            }
            
            // 経路の長さが n から 1 までのステップ数になる
            // ただし、この問題は「操作を繰り返して1に到達するまでの手数」を求めるため、
            // 経路上の各ステップが1になるように計算する必要がある。
            
            // 再計算（メモ化を最大限に活用するため、経路を辿って計算する）
            let currentSteps = 0;
            let temp = n;
            const history: number[] = [n];
            
            while (temp !== 1) {
                if (memo.has(temp)) {
                    currentSteps += memo.get(temp)!;
                    break;
                }
                
                if (temp % 2 === 0) {
                    temp = temp / 2;
                } else {
                    temp = 3 * temp + 1;
                }
                history.push(temp);
                currentSteps++;
            }
            
            // 1に到達した後のステップ数をメモ化
            if (temp === 1) {
                memo.set(n, currentSteps);
                totalCount += currentSteps;
            }
        }
    }

    // 最終結果の出力
    console.log(`total=${totalCount}`);
}

solve();
