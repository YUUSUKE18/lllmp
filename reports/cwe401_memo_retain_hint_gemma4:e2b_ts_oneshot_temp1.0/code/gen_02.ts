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

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * 繰り返し操作の手数を計算する関数 (3n+1問題)
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current !== 1) {
            if (current === 1) break; // 既に1に到達したらループ終了
            
            if (path.has(current)) {
                // サイクルに陥った場合、計算は停止（問題文の意図が不明確だが、通常は無限ループを避けるため）
                // ただし、この問題は「1に到達するまでの手数」なので、cycle detectionはより深いDP/memoizationの文脈で行うべき。
                // ここでは、一般的な3n+1問題の文脈で、1に到達するパスを追うことを優先する。
                // サイクル検出は、より複雑な最適化（最短経路）が必要な場合に重要だが、ここでは単純な再帰的メモ化を優先する。
                // 暫定的に、サイクル検出が厳密に必要でないと仮定し、単純な再帰メモ化に依存する。
                // ただし、大きな数に対する計算でタイムアウトしないように、サイクル検出は重要。
                // ここでは、到達した値が既に計算済みかどうかで十分とする。
                // サイクル検出は、現在のパス内で同じ値に到達した場合に、その分岐が無限ループになることを示す。
                // 今回は、3n+1問題の典型的なメモ化を適用する。
                // サイクル検出は、値が大きくなりすぎるのを防ぐためにも役立つ。
                // ただし、この実装では、単純に再帰メモ化のみに焦点を当てる。
            }

            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
            path.add(current);
        }

        // 1に到達したときのステップ数を格納
        memo.set(n, steps);
        return steps;
    }

    for (const line of lines) {
        let n;
        const num = parseInt(line, 10);

        if (isNaN(num) || num < 1) {
            continue; // 整数として解釈できない行や1未満の値を無視
        }
        
        // 各クエリに対して手数を計算し、合計に加算（memoizationは関数内部で行われる）
        const steps = countSteps(num);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
