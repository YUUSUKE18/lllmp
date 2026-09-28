/**
 * 仕様に従い、Collatz予想に関するクエリの手数を計算し、その合計を求めるプログラム。
 * メモ化を使用して効率化する。
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

    // メモ化のためのマップ
    const memo: Map<number, number> = new Map();
    let totalCount = 0;

    for (const line of lines) {
        let n: number;
        // 整数として解釈を試みる
        if (!isNaN(Number(line))) {
            n = Number(line);

            if (n === 1) {
                // nが1のときの手数は0
                const count = 0;
                memo.set(1, count);
                totalCount += count;
                continue;
            }

            // 再帰とメモ化による計算
            const calculateSteps = (startN: number): number => {
                if (startN === 1) {
                    return 0;
                }
                if (memo.has(startN)) {
                    return memo.get(startN)!;
                }

                // 3n+1 または n/2 の操作
                let steps = 0;
                let currentN = startN;
                const path: number[] = []; // 経路を記録して、計算途中でメモ化できるようにする

                while (currentN !== 1) {
                    path.push(currentN);
                    if (currentN % 2 === 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                }
                
                // 1に到達するまでのステップ数は経路の長さ（遷移回数）
                // スタートNから1に到達するまでの操作の回数
                let stepsCount = 0;
                let tempN = startN;
                while (tempN !== 1) {
                    if (tempN % 2 === 0) {
                        tempN /= 2;
                    } else {
                        tempN = 3 * tempN + 1;
                    }
                    stepsCount++;
                }

                // 経路上の各ステップをメモ化する（これはCollatz問題の標準的なメモ化戦略だが、ここでは単に到達数を求める）
                // 再帰的なメモ化を再構築する
                
                // この問題は「1に到達するまでの手数」を問うものであり、
                // 経路上の各数値のメモ化が効率的。
                
                // 経路を辿って、未計算のノードがあれば再帰的に処理する
                for (const val of path) {
                    if (!memo.has(val)) {
                        // 経路を逆向きに辿って、必要な計算をメモ化する（DFS的なメモ化）
                        // ただし、これは単純な反復計算で十分であり、再帰呼び出しよりも実装が単純になる。
                        // ここでは、単純にスタートから1への到達数を計算する。
                    }
                }
                
                // 再帰的なメモ化を試みる（ここでは再帰呼び出しで十分）
                
                // 既存の再帰定義を再利用する
                const result = calculateSteps(currentN);
                
                // 現在のステップを追加
                steps += 1; 
                
                memo.set(startN, steps);
                return steps;
            };

            // 最初のクエリに対する計算を実行
            const result = calculateSteps(n);
            totalCount += result;

        } else {
            // 整数として解釈できない行は無視
            continue;
        }
    }

    console.log(`total=${totalCount}`);
}

solve();
