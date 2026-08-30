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

    // 最初の行がクエリの数と仮定するが、仕様に従い、入力全体を整数として扱う
    // 実際には、入力が「1行に1個ずつ」の整数列であるため、各行を個別のクエリとして扱う
    
    let totalSteps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // nが1のときの手数は0
            totalSteps += 0;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
            continue;
        }

        // 再帰または反復計算で手数を求める
        let steps = 0;
        let current = n;
        const path = new Set<number>(); // サイクル検出用

        while (current !== 1) {
            if (path.has(current)) {
                // サイクルに陥った場合、このパスは無限ループになるが、
                // 1に到達する問題なので、通常はサイクルは発生しない（3n+1問題の性質上、1に収束する）
                // ただし、メモ化が正しく機能すればこれは発生しないはず。
                // 念のため、サイクル検出はここではスキップし、メモ化に依存する。
                break; 
            }
            path.add(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 1に到達したと仮定してメモ化
        if (current === 1) {
            // 実際には、この計算は「nから1に到達するまでのステップ数」を求める問題なので、
            // サイクル検出を伴う再帰的なメモ化（DP）が最も効率的。
            // ここでは、単純な反復計算でステップ数を計算し、それをメモする。
            memo.set(n, steps);
            totalSteps += steps;
        } else {
            // 1に到達しなかった場合（理論上は起こらないが、安全のため）
            // この問題設定では、必ず1に収束するため、このブロックは到達しないはず。
        }
    }

    // 最終的な合計を出力
    console.log(`total=${totalSteps}`);
}

solve();
