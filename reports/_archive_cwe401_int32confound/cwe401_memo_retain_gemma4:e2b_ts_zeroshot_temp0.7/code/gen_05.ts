/**
 * 仕様を満たすプログラム
 * 
 * 標準入力からクエリを読み込み、Collatz予想の手数（1に到達するまでのステップ数）を計算し、
 * その合計を求める。計算結果はメモ化して高速化する。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
        return;
    }

    let totalSteps = 0;
    const memo = new Map<number, number>();

    // 1行目から入力（空行や非整数行を無視）
    for (const line of input) {
        const nStr = line.trim();
        if (nStr === '') continue;

        const n = parseInt(nStr, 10);

        if (isNaN(n) || n < 1) continue;

        // メモ化された結果があればそれを使用
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
            continue;
        }

        // 再帰的または反復的に手数を計算（メモ化を利用）
        let current = n;
        const path: number[] = []; // 現在のパスを記録（計算中に再帰呼び出しを防ぐため、ここでは反復で深さを数える）
        let steps = 0;
        const visited: Set<number> = new Set(); // サイクル検出用

        while (current !== 1) {
            if (visited.has(current)) {
                // サイクルに陥った場合。Collatz予想では必ず1に到達するとされるが、
                // 念のため、サイクル検出時は終了させるか、エラー処理が必要。
                // この問題の文脈では、1に到達するまでのステップを求めるため、
                // サイクルに陥った場合は、その計算パスをスキップまたはエラーとするが、
                // Collatz予想に基づき、ここでは計算を続ける（ただし、無限ループになる可能性を考慮し、
                // 実際にはMemoizationが効くはずなので、これは通常発生しないと仮定する）。
                // 今回は、メモ化が効くことを期待して、サイクル検出は主にメモ化の補助として扱う。
                // もしサイクルが本当に発生した場合、それは「1に到達しない」ことを意味するが、
                // 問題の制約上、1に到達すると仮定する。
                // ここでは、もしサイクルが起きたら、その時点で計算を打ち切る（これは通常、Collatz問題では問題にならない）。
                break; 
            }
            
            visited.add(current);
            path.push(current);
            
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 計算結果をメモ化
        // 1に到達したか、または計算が終了したかを確認
        if (current === 1) {
            // 全ステップ数は、whileループで数えた steps に、最後の1から1への遷移（またはループの終了条件）を考慮する必要がある。
            // whileループは「currentが1になるまで」繰り返すため、1に到達したときのステップ数が正しくカウントされている。
            memo.set(n, steps);
            totalSteps += steps;
        } else {
            // 1に到達しなかった場合（サイクル検出時など）
            // この問題の性質上、これは発生しないと仮定するが、もし発生した場合は、
            // 処理をスキップするか、エラーとするべきだが、ここでは仕様に従い、
            // 1に到達するまでの手数を求めるため、計算が終了しなかった場合は、
            // このクエリのステップは無視するか、エラーとして扱うが、
            // 厳密には問題文の「1に到達するまでの手数」を求めるため、
            // このロジックはCollatz予想に基づいているため、1に到達すると仮定して進める。
            // 実際には、memo化が正しく機能すれば、このelseブロックには到達しないはず。
            // 安全のため、到達しなかった場合は、この計算パスは無効とする（ただし、合計には加算しない）。
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
