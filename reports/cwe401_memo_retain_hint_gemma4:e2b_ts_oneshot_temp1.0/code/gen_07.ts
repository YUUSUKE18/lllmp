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

    let currentInputIndex = 0;
    const queries: number[] = [];
    while (currentInputIndex < lines.length) {
        const line = lines[currentInputIndex];
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 1) {
            queries.push(n);
        }
        currentInputIndex++;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 置き換え操作の深さを計算する関数
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        const path: number[] = [];

        while (current !== 1) {
            if (memo.has(current)) {
                // 既に計算済みの値に到達した場合、その結果を遡って計算する
                const memoSteps = memo.get(current)!;
                // 現在のステップ数に、既に計算済みのステップ数を加算し、差分を足す
                // これは、現在の状態から既に計算済みの状態へのステップ数を考慮する必要があるが、
                // この問題では「nから1への最短経路」を求めるので、再帰的に辿る方が直接的で安全。
                // 既にmemoに格納されている値が「1への手数」なので、現在のパスを記録し続ける。
                break; // 再帰的なメモ化を諦め、単なる深さ優先探索で再計算する
            }
            path.push(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // ただし、この問題は「nから1への手数」なので、現在の実装ではメモ化の恩恵を活かすために再帰的なメモ化が最適。
        // 漸化式に基づき、再帰的に計算し、メモ化する。

        let stepsRecursive = 0;
        let temp = n;
        const stack: { n: number, steps: number }[] = [{ n: n, steps: 0 }];
        const visited = new Set<number>();
        visited.add(n);

        while (stack.length > 0) {
            const { n: curr, steps: s } = stack.pop()!;

            if (curr === 1) {
                memo.set(n, s);
                return s;
            }

            let next: number;
            if (curr % 2 === 0) {
                next = curr / 2;
            } else {
                next = 3 * curr + 1;
            }

            if (!visited.has(next)) {
                visited.add(next);
                stack.push({ n: next, steps: s + 1 });
            }
        }
        
        // DFSで到達できなかった場合（理論上は到達可能だが念のため）
        return Infinity; 
    }

    let totalSteps = 0;

    for (const n of queries) {
        // 各クエリについて、メモ化された結果を返す（メモ化が成功している前提で）
        const steps = countSteps(n);
        if (steps !== Infinity) {
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
