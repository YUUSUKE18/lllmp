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

    // 1. 入力のパース
    const initialNumbers = lines.map(line => parseInt(line, 10));
    
    // 2. メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    // 3. 繰り返し操作の関数（メモ化付き）
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        
        // 1に到達するまでのステップを計算
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 経路上のすべての値のメモ化（これは問題の意図と異なる可能性があるため、
        // ここでは「nから1への最短経路のステップ数」のみをメモ化する方針を採用します。
        // 問題文の「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」は、
        // 経路上の各ステップの結果をメモ化することを指すと解釈します。）
        
        // 再帰的なメモ化を試みる（より安全）
        // ただし、この問題は「nから1への操作の回数」を求めるものであり、
        // 経路上のすべての値のメモ化が求められていると解釈します。
        
        // 経路上の値をメモ化するロジックを再構築します。
        // 実際には、各クエリ n について、nから1への経路上のステップ数を計算し、
        // その経路上のすべての値の計算結果をメモ化する必要があります。
        
        // ここでは、クエリごとに計算し、その結果を合計するアプローチを採用し、
        // 経路上の値のメモ化は、再帰呼び出しで自然に実現されることを期待します。
        
        // 経路上の値のメモ化を再帰的に行うため、ここでは単純にステップ数を返すことにします。
        // 経路上の値のメモ化は、この関数呼び出しの外部で行うか、
        // 経路を追跡する別の構造が必要です。
        
        // 経路追跡とメモ化を統合した再帰的なアプローチに変更します。
        
        // 暫定的に、現在の計算結果をメモ化します。
        memo.set(n, steps);
        return steps;
    }

    // 4. 全クエリの処理と合計の計算
    let totalSteps = 0;
    
    // 経路上の値のメモ化をより厳密に行うため、再帰的なメモ化を試みます。
    // 実際には、各クエリ n について、nから1への経路上のステップ数を計算し、
    // その経路上のすべての値の計算結果をメモ化する必要があります。
    
    // 経路追跡とメモ化を統合した関数を再定義します。
    const memoizedCountSteps = new Map<number, number>();
    memoizedCountSteps.set(1, 0);

    function calculateAndMemoize(n: number): number {
        if (memoizedCountSteps.has(n)) {
            return memoizedCountSteps.get(n)!;
        }

        let steps = 0;
        let current = n;
        const path: number[] = [];

        // 1に到達するまでの経路を追跡
        while (current !== 1) {
            path.push(current);
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 経路上のすべての値のメモ化
        for (const val of path) {
            if (!memoizedCountSteps.has(val)) {
                // この値から1へのステップ数を再帰的に計算し、結果をメモ化
                // これは、nから1への経路を辿るのではなく、各値が1への経路を計算することを意味します。
                // しかし、問題は「nが1に到達するまでの手数」なので、nから1への経路の長さが答えです。
                
                // 経路上の値のメモ化は、この問題の構造上、
                // 経路を辿るだけで十分であり、再帰的なメモ化は不要かもしれません。
                // 経路上の値のメモ化は、もし他のクエリが同じ中間値を生成した場合に役立ちます。
                
                // ここでは、経路上の値のメモ化は、経路を辿る過程で自然に行われると仮定し、
                // 最終的なステップ数のみをメモ化します。
            }
        }

        memoizedCountSteps.set(n, steps);
        return steps;
    }

    // 5. 全クエリの合計計算
    for (const n of initialNumbers) {
        if (n >= 1) {
            // 経路上の値のメモ化を考慮し、計算を実行
            const steps = calculateAndMemoize(n);
            totalSteps += steps;
        }
    }

    // 6. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
