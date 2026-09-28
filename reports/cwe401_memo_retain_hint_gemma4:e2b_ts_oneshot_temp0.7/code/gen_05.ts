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

    // 1から始まる入力の処理
    let n = parseInt(lines[0], 10);
    if (isNaN(n) || n < 1) {
        // 最初の入力が不正な場合、処理を終了
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * 置き換え操作を繰り返す手数を計算する関数（メモ化付き）
     * @param start n
     * @returns 1 に到達するまでの手数
     */
    function countSteps(start: number): number {
        if (start === 1) {
            return 0;
        }
        if (memo.has(start)) {
            return memo.get(start)!;
        }

        let current = start;
        let steps = 0;
        const history = new Set<number>();

        while (current !== 1) {
            if (history.has(current)) {
                // サイクルに陥った場合、このパスは無限ループ（またはサイクル内）だが、
                // この問題の文脈では、通常は1に到達するはず。
                // ただし、この問題はCollatz予想に基づいているため、1に到達すると仮定する。
                // サイクルが検出された場合は、そのサイクル内の遷移を考慮する必要があるが、
                // ここではシンプルに既出の値を参照して再帰的に処理する。
                // サイクル検出は、より複雑な最適化が必要な場合にのみ必要。
                // Collatz数列の性質上、1に収束すると仮定する。
            }
            
            // 3n+1 または n/2 の操作
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
            
            // 非常に大きな値になることを考慮し、メモ化のキーとして現在の値を使用
            // 64bit整数に収まる範囲なので、Mapキーとして問題ない。
            history.add(current);
        }

        // 1に到達したときのステップ数をメモする
        // 注意: この実装では、計算途中の状態もメモする必要がある（動的計画法的に）
        // しかし、今回は「1に到達するまでの手数」なので、単一のパスを計算する。
        
        // 実際には、すべてのクエリに対して計算し、その結果を合計する。
        // メモ化は、同じクエリが何度も入力された場合の高速化に役立つ。
        memo.set(start, steps);
        return steps;
    }

    let totalSteps = 0;

    // すべての行を処理
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const num = parseInt(line, 10);

        if (isNaN(num) || num < 1) {
            continue; // 無効な行は無視
        }

        // nが1のときの手数は0
        if (num === 1) {
            totalSteps += 0;
            continue;
        }
        
        // メモ化された結果を利用してステップ数を計算
        let steps = 0;
        let current = num;
        const visited = new Map<number, number>(); // サイクル検出用

        while (current !== 1) {
            if (visited.has(current)) {
                // サイクル検出（この問題では通常発生しないが、安全のため）
                // サイクル内でのステップ数を計算し、それ以上進まない
                // Collatz数列では、サイクルに陥っても1に収束することが保証されているため、
                // ここでは単純にサイクルを無視して処理を続ける（またはエラーとする）。
                // 競技プログラミングの文脈では、通常、このパスは問題の意図外とみなされる。
                break; 
            }
            
            visited.set(current, steps);

            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 1に到達したかどうかを確認（もし到達していれば）
        if (current === 1) {
            totalSteps += steps;
        } else {
            // 1に到達しなかった場合（サイクルに陥った場合など）、問題の制約外だが、
            // 実際にはこのパスが終了したと見なす。
            // 厳密には、Collatz数列は1に収束すると予想されるため、通常は到達するはず。
            // ここでは、到達しなかった場合はその計算を無視する（またはエラーとして扱うが、合計を求めるため無視が適切）。
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
