/**
 * 仕様に基づき、ユークリッドの不完全漸化式（3n+1問題）の解法をメモ化を用いて効率化し、
 * 全クエリの合計を求めるプログラム。
 */

function solve() {
    const fs = require('fs');

    // 標準入力から全てを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を行ごとに分割し、整数としてパースする
    const lines = input.split('\n');
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            // 整数として解釈できない行は無視される（parseIntがNaNを返す場合など）
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル (Memoization)
    const memo = new Map<number, number>();

    /**
     * 操作を繰り返して 1 に到達するまでの手数を計算する関数
     * @param n 開始値
     * @returns 1 に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let currentN = n;
        let steps = 0;

        while (currentN !== 1) {
            if (currentN === 0) {
                // 0に到達した場合、通常はここでループを終了する必要はないが、
                // 問題の制約上、3n+1問題の標準的な解法（停止条件が1）に基づき、
                // ここでは0から1へのパスは考えない（問題文が「1に到達するまで」とあるため）。
                // 3n+1問題の標準解法では、ループが無限に続く（または0に落ちる）ことが問題となる。
                // ただし、問題の操作は「nが偶数ならn/2、奇数なら3n+1」であり、これらは停止条件が「1」である。
                // 1に到達できない場合の安全策として、非常に大きな値になることを期待するが、
                // 通常、3n+1問題では収束が保証されるため、ここでは到達するものと仮定する。
                // 念のため、0や負の数になった場合はエラーとして扱うか、あるいはその値で計算を終了させる。
                // 今回は問題の構造上、n>=1に対しては1に収束すると仮定し、この分岐は実質的に発生しないものとする。
                // もし発生した場合、計算は停止しないため、ここでは安全のためエラーや非常に大きな値を返す（ただし、問題文は1に到達すると仮定）
                // 実際の3n+1問題の文脈では、このコードはFermat数やCollatzの関連問題のメモ化として機能する。
                // 今回は1に到達することを前提とするため、ここでは一般的な動作を優先する。
                break; 
            }
            
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 経路を遡って計算されたステップ数をメモする
        // 再帰的に計算するのではなく、これは単一の入力nに対する計算なので、
        // この関数呼び出しの結果をmemoに保存する。
        // ただし、この問題は「nから1への最小ステップ数」を求めているため、
        // 各クエリで独立に計算すれば良い。メモ化は同じ値が再訪された場合に有効。
        
        // ここでは、再帰的なメモ化ではなく、直接計算された値を返すことに焦点を当てる。
        // 呼び出し元のループで、結果をmemoに保存するように調整する。
        
        return steps;
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (n === 1) {
            totalSteps += 0;
            continue;
        }

        // メモ化の適用（計算を再利用する）
        if (!memo.has(n)) {
            // 再帰的な構造ではなく、直接計算してメモ化する
            let currentN = n;
            let steps = 0;
            const path: number[] = []; // パスを記録して、後でまとめてメモするために使用する

            while (currentN !== 1) {
                if (memo.has(currentN)) {
                    // 既にメモがあれば、そこから計算し直す
                    const memoSteps = memo.get(currentN)!;
                    steps += memoSteps;
                    break; // ここでは再帰的なメモ化を避けるため、これは複雑になる。直接計算を継続する。
                }
                
                path.push(currentN); // 経路を記録（これは本来不要だが、再帰的メモ化には必要）

                if (currentN % 2 === 0) {
                    currentN = currentN / 2;
                } else {
                    currentN = 3 * currentN + 1;
                }
                steps++;
            }
            
            // --- より単純なアプローチ：関数呼び出しとメモ化 ---
            // 再帰的なメモ化を用いる方が、クエリの組み合わせに対するメモ化の恩恵が大きい。
            // ただし、本問題の操作は「n -> f(n)」であり、1への到達を問うため、
            // 3n+1問題の文脈では、通常は「nから1へのパス」ではなく「1へのパス」が問われる。
            // 求められているのは「nから1への手数」である。

            // 修正：元の構造に戻り、直接計算とメモ化を行う。
            // この問題は「nから1への最短経路」を問うものであり、
            // 1に到達するまでの手順を追う計算であり、これは再帰的メモ化が最も自然である。
            
            // 再帰的なメモ化を採用し、計算を再実行する。
            
            let result = 0;
            const stack: { n: number, count: number }[] = [{ n: n, count: 0 }];
            const visited = new Set<number>(); // サイクル検出用（通常、3n+1問題では不要だが安全のため）

            while (stack.length > 0) {
                const { n: currentN, count: currentCount } = stack.pop()!;

                if (currentN === 1) {
                    result = currentCount;
                    break;
                }
                
                // メモ化チェック（状態が重複した場合）
                if (memo.has(currentN)) {
                    const memoSteps = memo.get(currentN)!;
                    result = currentCount + memoSteps;
                    break;
                }

                if (visited.has(currentN)) {
                    // サイクルに陥った場合 (通常、3n+1問題では発生しないはずだが、念のため)
                    continue;
                }
                visited.add(currentN);

                let nextN: number;
                if (currentN % 2 === 0) {
                    nextN = currentN / 2;
                } else {
                    nextN = 3 * currentN + 1;
                }
                
                stack.push({ n: nextN, count: currentCount + 1 });
            }
            
            // 計算結果をメモに保存
            // 注意: 上記のスタックベースのアプローチは、最適経路を見つけるためにBFSに似ているが、
            // 3n+1問題では「1に到達する最小ステップ数」が求められているため、
            // 通常は「nから1への逆操作」で計算するか、または単純な再帰的メモ化で十分である。
            // 以下のシンプルな再帰的メモ化に切り替える。

            // --- 再帰的メモ化への切り替え ---
            const finalResult = computeWithMemo(n);
            totalSteps += finalResult;
            memo.set(n, finalResult);
        } else {
            // すでにメモされている場合
            totalSteps += memo.get(n)!;
        }
    }

    /**
     * 再帰的メモ化を用いて n から 1 への最短手数を計算する
     * @param n 開始値
     * @returns 1 に到達するまでの手数
     */
    function computeWithMemo(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let nextN: number;
        if (n % 2 === 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        // 再帰ステップ: (1からnへの手数) + 1
        const result = 1 + computeWithMemo(nextN);
        
        memo.set(n, result);
        return result;
    }
    
    // 最終的な合計を計算し直す（上記ループ内の計算が不完全だったため、再計算で確定させる）
    // もし上記ループ内で計算が完了していれば、この部分は不要だが、安全のため。
    // 実際には、ループ内の計算がmemo化を適切に行っていれば、このステップは不要になる。
    // 上記の複雑な試行錯誤を避け、最もクリーンな構造に修正する。

    // --- 最終的なクリーンな実装 ---
    
    const finalMemo = new Map<number, number>();
    let finalTotal = 0;

    function getSteps(n: number): number {
        if (n === 1) return 0;
        if (finalMemo.has(n)) return finalMemo.get(n)!;

        let nextN: number;
        if (n % 2 === 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        const result = 1 + getSteps(nextN);
        finalMemo.set(n, result);
        return result;
    }
    
    for (const n of queries) {
        finalTotal += getSteps(n);
    }


    console.log(`total=${finalTotal}`);
}

solve();
