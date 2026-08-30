/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n に対して、nが偶数なら n/2、奇数なら 3n+1 を繰り返して 1 に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 入力は1行に1個ずつ与えられる。
 * 
 * この問題は、Collatz予想（3n+1問題）に関連しており、メモ化（動的計画法またはメモ化再帰）を用いて効率的に解く必要がある。
 */

function solve() {
    const fs = require('fs');

    // 標準入力から全データを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries = [];
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル (Map: n -> 手数)
    const memo = new Map<number, number>();
    
    /**
     * Collatz操作を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function collatz_steps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        const path = []; // 経路を記録してメモ化を効率的に行うため

        while (current !== 1) {
            if (memo.has(current)) {
                // 途中でメモ化された値に到達した場合
                const memo_steps = memo.get(current)!;
                steps += memo_steps;
                break;
            }
            
            path.push(current);
            
            if (current % 2 === 0) {
                current /= 2;
            } else {
                // 3n + 1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値について、1 に到達するまでの総手数を計算し、メモ化する
        // これは、再帰的なメモ化よりも、現在のパス全体を処理する方が、
        // 複雑な分岐を避けて効率的になる場合がある（特に、全ての経路の合計を求める場合）。
        // ここでは、単一の開始点 n から 1 への最短経路の長さを求めるため、
        // 経路上の各ステップでメモ化を行うのが最も直接的。
        
        // 再帰的なアプローチに戻り、各ステップでメモ化を行う
        // (再帰呼び出しでメモ化を保証するため、ここでは再帰的に実装し直す)
        
        // --- 再帰的なメモ化の実装 ---
        
        // 既に計算済みの経路を辿って、現在のステップの値をメモ化する
        let total_steps = 0;
        let temp_n = n;
        const history: number[] = [n];
        
        while (temp_n !== 1) {
            if (memo.has(temp_n)) {
                // 既に計算済みの値に到達した場合、その結果を足し合わせる
                total_steps += memo.get(temp_n)!;
                break;
            }
            
            if (temp_n % 2 === 0) {
                temp_n /= 2;
            } else {
                temp_n = 3 * temp_n + 1;
            }
            history.push(temp_n);
        }
        
        // 経路上のすべての値について、1 に到達するまでの総手数を計算してメモ化する
        // これは、n から 1 へのパスの長さではなく、n から 1 へのパス上の各値が持つ「残り手数」を計算するアプローチになる。
        
        // 簡略化のため、標準的なメモ化再帰で実装し直す。
        // 1 に到達するまでの「手数」を求める。
        
        const stack: { n: number, depth: number }[] = [{ n: n, depth: 0 }];
        const visited_in_path = new Set<number>();
        
        while (stack.length > 0) {
            const { n: current_n, depth: depth_n } = stack.pop()!;

            if (current_n === 1) {
                // 1 に到達した。このパスの深さを記録する。
                // この問題は「1 に到達するまでの手数」を求めるため、単一の経路を辿る。
                // 複数の経路が存在する場合、通常は最短経路を求めるが、Collatz問題では単一の経路が定義される。
                // ここでは、n から 1 への単一のパスの長さを求める。
                memo.set(n, depth_n);
                return depth_n;
            }
            
            // 再帰的なメモ化を試みる
            if (memo.has(current_n)) {
                // 既に計算済みなら、その結果を深さに加算して終了
                memo.set(n, depth_n + memo.get(current_n)!);
                return memo.get(n)!;
            }
            
            // 探索を続ける
            if (visited_in_path.has(current_n)) {
                // サイクル検出（Collatzでは通常発生しないが、安全のため）
                continue;
            }
            visited_in_path.add(current_n);

            let next_n: number;
            if (current_n % 2 === 0) {
                next_n = current_n / 2;
            } else {
                next_n = 3 * current_n + 1;
            }
            
            stack.push({ n: next_n, depth: depth_n + 1 });
        }
        
        // このロジックは、単一の経路を辿るのではなく、探索空間全体を探索しようとするため、
        // 実際には「n から 1 への最短経路」を求める問題（逆方向の探索）に近くなる。
        // 標準的なCollatzのメモ化は、再帰的な依存関係を利用する。
        
        // --- 最終的なメモ化再帰の実装 ---
        
        // 再帰的に計算し、戻り値として「n から 1 への手数」を返す。
        // 既にmemoに存在すれば即座に返す。
        
        let current_memo_result = 0;
        let temp_n_for_memo = n;
        
        // 経路を辿りながら、memo化された値があればそれを利用する
        const path_to_memo = [];
        let temp = n;
        
        while (temp !== 1) {
            if (memo.has(temp)) {
                current_memo_result += memo.get(temp)!;
                break;
            }
            path_to_memo.push(temp);
            if (temp % 2 === 0) {
                temp /= 2;
            } else {
                temp = 3 * temp + 1;
            }
        }
        
        // 経路上の各ステップをメモ化する（これは、n から 1 へのパスの長さではなく、
        // 経路上の各値が持つ「残り手数」を計算するアプローチ）
        // この問題の要求は「n が 1 に到達するまでの手数」なので、単に再帰で計算するのが最も自然。
        
        // 再帰的なメモ化を再試行。
        // 1 に到達するまでの手数 = 1 + collatz_steps(next_n)
        
        const recursive_memo = new Map<number, number>();
        
        function calculate_steps_recursive(k: number): number {
            if (k === 1) {
                return 0;
            }
            if (recursive_memo.has(k)) {
                return recursive_memo.get(k)!;
            }

            let next_k: number;
            if (k % 2 === 0) {
                next_k = k / 2;
            } else {
                next_k = 3 * k + 1;
            }

            const result = 1 + calculate_steps_recursive(next_k);
            recursive_memo.set(k, result);
            return result;
        }
        
        // 最初の呼び出し
        const final_result = calculate_steps_recursive(n);
        
        // 全ての計算結果を外部のmemoに反映させる（これは、関数スコープの問題を避けるため、
        // 外部のmemoを更新する形にするか、関数をラップする形にする必要がある。
        // 今回は、関数内で完結させるため、この関数を再定義する。
        
        return final_result;
    }
    
    // 最終的な計算を実行（memo化は内部で完結させる）
    const final_total = 0;
    
    // 外部のメモ化をクリアし、再実行
    const final_memo = new Map<number, number>();
    
    function calculate_final(k: number): number {
        if (k === 1) {
            return 0;
        }
        if (final_memo.has(k)) {
            return final_memo.get(k)!;
        }

        let next_k: number;
        if (k % 2 === 0) {
            next_k = k / 2;
        } else {
            next_k = 3 * k + 1;
        }

        const result = 1 + calculate_final(next_k);
        final_memo.set(k, result);
        return result;
    }

    let total_sum = 0;
    for (const n of queries) {
        if (n < 1) continue; // 入力チェック
        
        // 各クエリに対して計算を実行し、メモ化を更新する
        const steps = calculate_final(n);
        total_sum += steps;
    }

    // 結果の出力
    console.log(`total=${total_sum}`);
}

solve();
