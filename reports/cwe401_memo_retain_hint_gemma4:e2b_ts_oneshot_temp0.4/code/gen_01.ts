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

    // 1から始まる整数列を読み込む
    const initialNumbers = lines.map(line => parseInt(line, 10));

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する関数
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
            if (path.has(current)) {
                // サイクルに陥った場合、これは通常、3n+1問題の解法で発生する
                // ただし、この問題設定では1に到達することが保証されているため、
                // サイクル検出は厳密には不要かもしれないが、安全のため残す。
                // 実際には、3n+1問題では通常、1に到達するパスを辿る。
                // ここでは、1に到達するまでのパスを追跡する。
                // サイクル検出は、もしnが1に到達しない場合の安全策として機能する。
                // 今回の仕様では、1に到達すると仮定する。
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

        // 1に到達したか確認（3n+1問題では必ず1に到達する）
        if (current === 1) {
            // パスをメモ化
            // 逆順にステップ数を記録していく必要があるが、再帰的に計算する方がシンプル
            // ここでは、直接計算したステップ数をメモ化する
            
            // 再帰的なメモ化を試みる（より安全）
            let result = 0;
            let temp = n;
            while (temp !== 1) {
                if (temp % 2 === 0) {
                    temp /= 2;
                } else {
                    temp = 3 * temp + 1;
                }
                result++;
            }
            
            memo.set(n, result);
            return result;
        }
        
        // 1に到達しなかった場合（仕様上は発生しないはず）
        return Infinity; 
    }

    let totalSteps = 0;

    for (const n of initialNumbers) {
        if (n >= 1) {
            // 3n+1問題の解法を適用して手数を計算し、メモ化する
            // 実際には、この問題は「1に到達するまでの手数」を求めるため、
            // サイクル検出よりも、直接計算で十分であり、メモ化は再帰的な構造で最も効果的。
            // しかし、ここでは「操作を繰り返す」という指示なので、その過程を追う。
            
            // サイクル検出を無視し、直接計算で手数を求める（メモ化は再帰で実現する）
            
            // 再帰的なメモ化を適用した計算関数を再定義する
            
            function calculate_steps(n_val: number): number {
                if (n_val === 1) return 0;
                if (memo.has(n_val)) return memo.get(n_val)!;

                let steps = 0;
                let current_n = n_val;
                
                // サイクル検出のためのセット（3n+1問題では通常不要だが、安全のため）
                const history = new Map<number, number>(); // 値 -> ステップ数
                history.set(n_val, 0);

                while (current_n !== 1) {
                    if (history.has(current_n)) {
                        // サイクル検出。この問題では通常発生しないが、発生した場合はエラーまたは特殊処理。
                        // ここでは、サイクルが発生した場合は、その時点で計算を打ち切る。
                        return Infinity; 
                    }
                    
                    if (current_n % 2 === 0) {
                        current_n /= 2;
                    } else {
                        current_n = 3 * current_n + 1;
                    }
                    steps++;
                    history.set(current_n, steps);
                }
                
                memo.set(n_val, steps);
                return steps;
            }

            const steps = calculate_steps(n);
            
            if (steps !== Infinity) {
                totalSteps += steps;
            }
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
