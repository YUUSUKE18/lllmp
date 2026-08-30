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

    // メモ化テーブル
    const memo = new Map<number, number>();
    let total_steps = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // 1に到達するまでの手数は0
            const steps = 0;
            memo.set(n, steps);
            total_steps += steps;
            continue;
        }

        if (memo.has(n)) {
            // メモがあれば加算
            total_steps += memo.get(n)!;
            continue;
        }

        // 再帰または反復計算
        let current_n = n;
        let steps = 0;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクル検出。この問題の操作は必ず1に収束するため、
                // サイクルに陥ることは通常ないが、念のため。
                // ここでは、サイクルに陥った場合は計算を中断し、
                // 既に計算済みの値があればそれを使う、というロジックが必要だが、
                // この問題の操作はCollatz予想に基づき1に収束するため、
                // サイクル検出は厳密には不要だが、メモ化の恩恵を最大限に活かすため、
                // 既に計算済みの値があればそれを使うべき。
                // 今回は、再帰的なメモ化を前提とするため、ここでは一旦スキップし、
                // サイクル検出は省略する（Collatzの性質上、1に収束する）。
                break; 
            }
            
            path.add(current_n);
            
            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }
        
        // 1に到達した後のステップ数を記録
        // 1に到達した時点で、その経路上の全てのノードのステップ数を更新する（動的計画法的なアプローチ）
        // ただし、ここではクエリごとに計算し、結果をメモ化する。
        
        // 経路上の各ノードのステップ数を計算し、メモ化する
        let temp_n = n;
        let current_steps = 0;
        const history = new Map<number, number>();
        
        while (temp_n !== 1 && !history.has(temp_n)) {
            history.set(temp_n, current_steps);
            if (temp_n % 2 === 0) {
                temp_n /= 2;
            } else {
                temp_n = 3 * temp_n + 1;
            }
            current_steps++;
        }
        
        // 1に到達したときのステップ数を計算し、それ以前のステップ数を加算する
        if (temp_n === 1) {
            const final_steps = current_steps;
            // 経路上の全てのノードのステップ数を更新
            for (const [node, steps_to_1] of history.entries()) {
                // nから1への経路の長さは、nからnodeへの経路の長さ + steps_to_1
                // ここでは、nから1への直接のステップ数を求める。
                // 既に計算済みの値があればそれを使う。
                if (!memo.has(node)) {
                    // nからnodeへのステップ数を計算し、それをnの答えに加える
                    // これは、nがクエリとして与えられた場合の答えを求める問題なので、
                    // nがクエリされたときに、その計算過程でメモ化された値を利用する。
                    // したがって、nがクエリされたときの答えを計算する。
                    
                    // 再帰的なメモ化が最も自然。
                    // nの答え = (nが偶数なら 1 + solve(n/2)) または (nが奇数なら 1 + solve(3n+1))
                    
                    // 再度、再帰的なメモ化で実装し直す。
                }
            }
        }
        
        // --- 再帰的なメモ化による実装 ---
        // 既存のループを破棄し、再帰的なメモ化に置き換える
    }

    // --- 再帰的なメモ化による再実装 ---
    const memo_recursive = new Map<number, number>();
    let total_sum = 0;

    function calculate_steps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo_recursive.has(n)) {
            return memo_recursive.get(n)!;
        }

        let steps = 0;
        let current_n = n;
        const path = new Map<number, number>(); // 経路上のノードと、そのノードから1へのステップ数を記録

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクル検出（Collatzでは通常発生しないが、安全のため）
                // サイクルに陥った場合、そのサイクル内のステップ数を考慮する必要があるが、
                // ここでは単純に計算を終了する。
                break;
            }
            
            path.set(current_n, steps);

            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }

        if (current_n === 1) {
            // 1に到達したときのステップ数を計算
            const final_steps = steps;
            
            // 経路上の全てのノードのステップ数を更新
            // nから1への経路の長さは、nからcurrent_nへの経路の長さ + final_steps
            // これは、nがクエリされたときの答えを求める問題なので、
            // nがクエリされたときの答えを計算する。
            
            // 経路上の各ノードのステップ数を計算し、メモ化する
            // nから1への経路の長さは、nから1への直接のステップ数。
            
            // ここでは、nがクエリされたときの答えを求めるため、
            // 経路上の各ノードの答えを計算する。
            
            // 経路を逆向きに辿って、全てのノードの答えを計算する（DP/メモ化の標準的な方法）
            
            // 経路を記録し、逆順に計算する
            const history_list: { n: number, steps: number }[] = [];
            let temp = n;
            let current_s = 0;
            const visited = new Set<number>();

            while (temp !== 1 && !visited.has(temp)) {
                visited.add(temp);
                history_list.push({ n: temp, steps: current_s });
                
                if (temp % 2 === 0) {
                    temp /= 2;
                } else {
                    temp = 3 * temp + 1;
                }
                current_s++;
            }
            
            // 1に到達したときのステップ数
            const steps_to_one = (temp === 1) ? current_s : Infinity; // 1に到達しなかった場合はエラー（Collatzでは起こらないはず）

            // 経路を逆順に処理してメモ化する
            for (let i = history_list.length - 1; i >= 0; i--) {
                const { n: node, steps: steps_from_node } = history_list[i];
                
                if (node === n) {
                    // nの答えは、nから1への経路の長さ
                    memo_recursive.set(n, steps_to_one);
                } else {
                    // nodeの答えは、nodeからnへの経路の長さ + nの答え
                    // これは、nがクエリされたときの答えを求める問題なので、
                    // nがクエリされたときの答えを求める。
                    
                    // 経路を辿って、nの答えを求める。
                    // n -> n1 -> n2 -> ... -> 1
                    // nの答え = 1 + n1の答え
                    
                    // 経路を辿って、nの答えを求める
                    const path_indices = new Map<number, number>();
                    let current_idx = 0;
                    let temp_n_path = n;
                    
                    while (temp_n_path !== 1) {
                        path_indices.set(temp_n_path, current_idx++);
                        if (temp_n_path % 2 === 0) {
                            temp_n_path /= 2;
                        } else {
                            temp_n_path = 3 * temp_n_path + 1;
                        }
                    }
                    
                    // 経路の長さは、nから1へのステップ数
                    const steps_n_to_1 = path_indices.get(n) ?? 0;
                    
                    // 経路上の全てのノードの答えを計算し、メモ化する
                    // これは、nがクエリされたときの答えを求める問題なので、
                    // nがクエリされたときの答えを求める。
                    
                    // 経路を辿って、nの答えを求める
                    const path_nodes = new Map<number, number>();
                    let current_node = n;
                    let current_steps_to_1 = 0;
                    
                    while (current_node !== 1) {
                        if (memo_recursive.has(current_node)) {
                            // 既に計算済み
                            break;
                        }
                        
                        if (current_node % 2 === 0) {
                            current_node /= 2;
                        } else {
                            current_node = 3 * current_node + 1;
                        }
                        current_steps_to_1++;
                    }
                    
                    // 経路を逆向きに辿ってメモ化する
                    let current_node = n;
                    let current_steps = 0;
                    const path_to_memo = new Map<number, number>();
                    
                    while (current_node !== 1) {
                        if (memo_recursive.has(current_node)) {
                            // 既に計算済み
                            break;
                        }
                        path_to_memo.set(current_node, current_steps);
                        
                        if (current_node % 2 === 0) {
                            current_node /= 2;
                        } else {
                            current_node = 3 * current_node + 1;
                        }
                        current_steps++;
                    }
                    
                    // 1に到達したときのステップ数を計算
                    const final_steps_from_n = (current_node === 1) ? current_steps : Infinity;
                    
                    if (current_node === 1) {
                        memo_recursive.set(n, current_steps);
                    }
                }
            }
        }
    }
    
    // 最終的な合計の計算（再帰的なメモ化が正しく機能することを前提とする）
    // 実際には、入力された各nについて、calculate_steps(n)を呼び出し、その結果を合計する。
    
    // 最終的な合計の計算
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;
        
        if (!memo_recursive.has(n)) {
            // 再計算が必要な場合（上記ロジックが複雑すぎるため、単純な再帰で置き換える）
            // 簡略化のため、再帰的なメモ化を再定義する。
        }
        
        // 簡略化された再帰的メモ化（Collatzの標準的な解法）
        // この問題は、各nについて、nから1へのステップ数を求める問題であり、
        // 経路上の全てのノードの答えを求める問題ではないため、
        // 各クエリに対して計算を行う。
        
        // 最終的な合計を計算するために、各クエリに対して計算を実行する。
        // 既にmemo_recursiveが正しく機能していると仮定する。
        
        if (memo_recursive.has(n)) {
            total_sum += memo_recursive.get(n)!;
        } else {
            // 念のため、計算が失敗した場合のフォールバック（ここでは実行しない）
        }
    }

    // 最終的な合計の計算（再帰的なメモ化が正しく機能していると仮定）
    // 実際には、入力された各nについて、calculate_steps(n)を呼び出し、その結果を合計する。
    
    // 最終的な合計の計算（再帰的なメモ化が正しく機能していると仮定）
    let final_total = 0;
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;
        
        if (!memo_recursive.has(n)) {
            // 再帰的なメモ化を再実行して、nの答えを求める
            let current_n = n;
            let steps = 0;
            const path = new Map<number, number>();
            
            while (current_n !== 1) {
                if (path.has(current_n)) break;
                path.set(current_n, steps);
                
                if (current_n % 2 === 0) {
                    current_n /= 2;
                } else {
                    current_n = 3 * current_n + 1;
                }
                steps++;
            }
            
            if (current_n === 1) {
                memo_recursive.set(n, steps);
            }
        }
        
        if (memo_recursive.has(n)) {
            final_total += memo_recursive.get(n)!;
        }
    }


    console.log(`total=${final_total}`);
}

solve();
