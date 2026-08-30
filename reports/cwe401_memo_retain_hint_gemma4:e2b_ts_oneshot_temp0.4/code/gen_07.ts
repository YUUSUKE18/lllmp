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
    
    // 2. メモ化のためのキャッシュ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 繰り返し操作の手数を計算する関数 (メモ化付き)
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        
        // 経路を追跡し、サイクルを検出する
        const path = new Map<number, number>(); // 値 -> ステップ数
        path.set(n, 0);
        
        while (current !== 1) {
            if (current <= 0) {
                // 1以上の整数が入力されるという前提だが、念のため
                break;
            }
            
            if (memo.has(current)) {
                // 既知の値を辿る
                const knownSteps = memo.get(current)!;
                steps += knownSteps;
                break;
            }

            // サイクル検出
            if (path.has(current)) {
                // サイクルに陥った場合、これは通常、3n+1問題では発生しないが、
                // サイクルを検出した場合、そのサイクル内のステップ数を考慮する必要がある。
                // しかし、この問題は必ず1に収束するため、サイクル検出は主にメモ化の深さ制限として機能する。
                // ここでは、単純に現在のパスを辿ることで、もしサイクルが検出されたら、そのサイクル内の移動を計算する。
                // ただし、3n+1問題では、1に収束するため、サイクルは1を含む閉じたループになる。
                // 実際には、3n+1問題では、1に収束する経路が保証されているため、サイクルは発生しない（または1に到達する）。
                // 念のため、ここでは単純にパスを辿ることに集中する。
            }

            // 操作の適用
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;

            // 非常に大きな数になる可能性を考慮し、64bit整数として扱う
            if (steps > 1000000) { // 安全策として無限ループを防ぐための制限（実質的には不要だが、安全のため）
                // この問題の性質上、到達しないはずだが、もし到達しないならエラーまたは大きな値として扱う
                break;
            }
        }

        // 最終的な結果をメモ化
        // 経路全体を再計算してメモ化する（より厳密なメモ化）
        let totalSteps = 0;
        let temp = n;
        const history = new Map<number, number>(); // 値 -> ステップ数
        history.set(n, 0);
        history.set(1, 0);

        while (temp !== 1) {
            if (history.has(temp)) {
                // 既に計算済みの値に到達した場合
                totalSteps += history.get(temp)!;
                break;
            }
            
            if (temp % 2 === 0) {
                temp = temp / 2;
            } else {
                temp = 3 * temp + 1;
            }
            totalSteps++;
            history.set(temp, totalSteps);
        }
        
        // 最終的な結果をメモ化に追加
        // 経路上の全てのノードについて、1への最短経路を計算し、memoに格納する
        // ただし、再帰的なメモ化が最も効率的。ここでは反復計算でメモ化を更新する。
        
        // 再帰的なメモ化を再試行する（より標準的なメモ化手法）
        
        const calculateMemo = (startN: number): number => {
            if (startN === 1) return 0;
            if (memo.has(startN)) return memo.get(startN)!;

            const path = new Map<number, number>();
            path.set(startN, 0);
            
            let currentN = startN;
            let stepCount = 0;
            
            while (currentN !== 1) {
                if (memo.has(currentN)) {
                    stepCount += memo.get(currentN)!;
                    break;
                }
                
                if (currentN % 2 === 0) {
                    currentN /= 2;
                } else {
                    currentN = 3 * currentN + 1;
                }
                stepCount++;
                path.set(currentN, stepCount);
            }
            
            // 経路上の全てのノードをメモ化に格納
            for (const [val, steps] of path.entries()) {
                memo.set(val, steps);
            }
            
            // 最終的な結果を返す
            return path.get(1)! + memo.get(startN)!; // 実際には path.get(1) が最終的なステップ数になるはず
        };
        
        // 最終的な計算は、再帰的なメモ化を前提とする
        // 最初の呼び出しで、nから1までの経路を辿り、その総ステップ数を求める。
        
        // 再帰的なメモ化を適用した結果を返す
        return memo.get(n) || 0; // 既に計算済みならそれを使う
    }

    // 3. 全クエリの処理と合計の計算
    let totalSum = 0;
    
    for (const n of initialNumbers) {
        if (n < 1) continue; // 1以上の整数のみを考慮
        
        // メモ化された結果を使用
        const steps = memo.get(n) || 0;
        totalSum += steps;
    }

    // 4. 結果の出力
    console.log(`total=${totalSum}`);
}

solve();
