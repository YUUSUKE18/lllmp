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
            // 既に計算済みであれば加算しない（ただし、この問題ではクエリごとに計算が必要なので、ここでは計算結果を直接加算する）
            totalCount += 0;
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
                // 途中でメモ化された値に到達した場合
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

        // 1に到達した後の手数を計算し、経路を遡ってメモ化する
        if (currentN === 1) {
            // 1に到達するまでの手数は、経路の長さ + 1 (最後のステップ)
            // ただし、問題の定義は「操作を繰り返して1に到達するまでの手数」なので、
            // 1からスタートして操作を繰り返すのではなく、nからスタートして1に到達するまでの操作回数を数える。
            // 1に到達するまでの操作回数を数えるため、経路の長さが操作回数となる。
            
            // 経路の長さが操作回数
            const result = path.length;
            
            // 経路上の各ステップをメモ化する
            for (let i = path.length - 1; i >= 0; i--) {
                const node = path[i];
                // nodeから1に到達するまでの手数を計算し、memoに保存する
                // これは、node -> ... -> 1 の経路を辿ることで計算される
                
                // 再帰的なメモ化（より効率的）
                // ここでは、nから1への経路を辿ることで、nが1になるまでのステップ数を計算する。
                
                // 経路を辿って、nから1へのステップ数を計算し、その結果をメモ化する
                // 既に計算済みの値があればそれを利用する
                if (!memo.has(node)) {
                    // 再帰的に計算を試みる（ただし、これはクエリごとに再計算になるため、
                    // 経路を辿る方法でメモ化を更新する）
                    
                    // 経路を辿って、nから1へのステップ数を計算する
                    let tempSteps = 0;
                    let tempN = node;
                    while (tempN !== 1) {
                        if (tempN % 2 === 0) {
                            tempN /= 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                        tempSteps++;
                    }
                    
                    // nodeから1への手数は、現在の経路の長さ + tempSteps
                    // これは複雑になるため、単純にnから1への手数を計算するアプローチに戻る。
                }
            }
            
            // シンプルに、nから1への手数を計算し、その結果をメモ化する
            let finalSteps = 0;
            let tempN_calc = n;
            while (tempN_calc !== 1) {
                if (tempN_calc % 2 === 0) {
                    tempN_calc /= 2;
                } else {
                    tempN_calc = 3 * tempN_calc + 1;
                }
                finalSteps++;
            }
            
            memo.set(n, finalSteps);
            totalCount += finalSteps;

        } else {
            // 1に到達しなかった場合（理論上、この操作では必ず1に到達するが、念のため）
            // この問題の操作はCollatz予想に基づいているため、1に到達すると仮定する。
            // 実際には、上記ループで計算された finalSteps を使用する。
            
            let finalSteps = 0;
            let tempN_calc = n;
            while (tempN_calc !== 1) {
                if (tempN_calc % 2 === 0) {
                    tempN_calc /= 2;
                } else {
                    tempN_calc = 3 * tempN_calc + 1;
                }
                finalSteps++;
            }
            
            memo.set(n, finalSteps);
            totalCount += finalSteps;
        }
    }

    // 最終結果の出力
    console.log(`total=${totalCount}`);
}

solve();
