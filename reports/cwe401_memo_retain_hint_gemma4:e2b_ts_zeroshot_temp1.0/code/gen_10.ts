/**
 * 64bit整数での操作の到達数を求める問題。
 * ターゲットは1。
 * nが偶数なら n/2、奇数なら 3n+1。
 * 同じ値が再出現する場合にメモ化（動的計画法/メモ化再帰）を用いる。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    let totalMoves = 0;
    const memo = new Map<number, number>();

    // 入力行を処理
    for (const line of input) {
        // 空行や数値として解釈できない行は無視
        const n = parseInt(line.trim(), 10);

        if (isNaN(n)) {
            continue;
        }

        if (n === 1) {
            // nが1のときは手数は0
            totalMoves += 0;
            continue;
        }

        // メモ化された結果があればそれを使用
        if (memo.has(n)) {
            totalMoves += memo.get(n)!;
            continue;
        }

        // 再帰または反復計算
        let current = n;
        let moves = 0;
        const path: number[] = []; // 計算過程を記録してメモ化に利用するため

        while (current !== 1) {
            if (memo.has(current)) {
                // 途中でメモ化された値に到達した場合
                moves += memo.get(current)!;
                break;
            }

            path.push(current);
            
            if (current % 2 === 0) {
                // nが偶数なら n/2
                current = current / 2;
            } else {
                // nが奇数なら 3n+1
                current = 3 * current + 1;
            }
            moves++;
        }
        
        // 最終到達点 (1) までの手数を計算し、メモ化
        if (current === 1) {
            // もし計算がループ内で完結した場合、移動回数を加算
            // 注意: 上記のwhileループの構造上、直接現在のステップ数を計算する方がシンプル。
            // 再度、メモ化をより確実に実行するため、再帰的なメモ化（またはDP）を検討する。
            // ここでは、現在のnから1までの最短経路を計算し、その経路上の各ノードをメモ化するアプローチを採用する。
            
            // 経路上の各ノードの手数を計算し、最後に合計する方針に変更する。
            // 単純な経路追跡よりも、スタートからゴールまでの単一の最短経路を求める方が、
            // 繰り返し操作の定義に従う問題として適切。
            
            // 再度、メモ化のロジックをDP的に修正する。
            // 今回は、入力されたnから1に到達するまでの「操作の回数」を求める。
            
            // 経路追跡で計算したステップ数を格納する。
            let steps = 0;
            let tempN = n;
            const visited = new Set<number>();
            const sequence: number[] = [];
            
            while (tempN !== 1) {
                if (visited.has(tempN)) {
                    // サイクル検出（この問題では1に到達する経路が通常は存在するため、これは通常発生しないが、安全策）
                    // しかし、この問題は「操作を繰り返し1に到達するまで」なので、常に1に収束する（Collatz Conjecture）。
                    // サイクル検出は、同じノードを通過したときの「追加の操作回数」を計算する際に必要。
                    // 今回は単に1に到達するまでの手数なので、サイクルは無視する。
                    break;
                }
                visited.add(tempN);
                sequence.push(tempN);

                if (tempN % 2 === 0) {
                    tempN /= 2;
                } else {
                    tempN = 3 * tempN + 1;
                }
                steps++;
            }

            // 1に到達した場合、その手数と、経路上の全てのノードの手数をメモ化する。
            if (tempN === 1) {
                // 経路上の各要素について、nからその要素に到達する手数を計算し、メモ化する
                let currentPathMoves = 0;
                const pathMemo = new Map<number, number>();
                pathMemo.set(n, 0);
                
                // 逆方向から計算してメモ化するのが最も効率的だが、ここでは単純に順方向の経路を再実行する
                // そして、計算された手数自体をメモ化する。
                
                // 経路の長さが n から 1 までの手数になる
                let calculatedMoves = 0;
                let temp = n;
                
                // nから1に到達するまでの手数
                while(temp !== 1) {
                    if (temp % 2 === 0) {
                        temp /= 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    calculatedMoves++;
                }
                
                memo.set(n, calculatedMoves);
                totalMoves += calculatedMoves;

            } else {
                // 1に到達しなかった場合（Collatzの仮定に反するが、入力されたnから1への経路を計算した結果）
                // 問題の定義上、1に到達すると仮定する。
                // もし上記で1に到達しなかった場合、それはエラーまたは問題の誤解を示唆するが、
                // 念のため、到達した経路の長さを加算する。
                // ここでは、Collatzが成立していることを前提とし、到達した場合のみ加算する。
            }
            
        } else {
            // 1に到達しなかった場合（上記で計算されたのが1でなかった場合）
            // このケースは、通常のCollatz問題の文脈では発生しないはず。
            // 実行された経路の手数として加算する。
             totalMoves += moves;
             memo.set(n, moves);
        }

    }
    
    // --- 再計算・メモ化ロジックの修正 ---
    // 繰り返し操作を求める問題は、通常、スタート(n)からゴール(1)までの「操作の回数」を求める。
    // メモ化を正しく行うためには、各nについて、n -> f(n) -> f(f(n)) -> ... -> 1 の過程の手数を計算する必要がある。

    // 最終的なロジックを、各nについて単一のパス計算として実行し、結果を合計するように修正する。
    
    const finalMemo = new Map<number, number>();
    let finalTotalMoves = 0;

    for (const line of input) {
        const n_str = line.trim();
        if (n_str === "") continue;
        
        const n = parseInt(n_str, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            finalMemo.set(1, 0);
            finalTotalMoves += 0;
            continue;
        }

        if (finalMemo.has(n)) {
            finalTotalMoves += finalMemo.get(n)!;
            continue;
        }

        // nから1への経路を再帰的に探索し、メモ化する（DP/メモ化再帰）
        // ただし、この問題は「操作の回数」を求めるため、非自明なDP遷移ではない。
        // 各ノード n に対して、n -> f(n) の遷移のみを考える。
        
        let current = n;
        let steps = 0;
        const path = [];
        const visitedInPath = new Set<number>();
        let cycleDetected = false;

        // 経路を辿り、到達するかサイクルが発生するか確認
        while (current !== 1 && !visitedInPath.has(current)) {
            if (visitedInPath.has(current)) {
                // サイクルが検出された場合、この経路は無限に続くか、
                // 問題の定義（1に到達するまでの手数）に合致しない可能性がある。
                cycleDetected = true;
                break;
            }
            visitedInPath.add(current);
            path.push(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        if (current === 1) {
            // 1に到達した場合
            // 現在のnから1への手数（steps）が、このクエリの答え
            finalMemo.set(n, steps);
            finalTotalMoves += steps;
        } else if (!cycleDetected) {
            // 1に到達せず、かつサイクルも検出されなかった場合（これはCollatzの仮定に反する）
            // 厳密には、この計算結果をそのまま採用する。
            finalMemo.set(n, steps);
            finalTotalMoves += steps;
        }
        // サイクルが検出された場合、到達しないため、このクエリの結果は不明だが、
        // 敵対的な入力に対しても実用的な時間を満たすため、探索を打ち切る。
    }


    // 最終結果の出力
    console.log(`total=${finalTotalMoves}`);
}

solve();
