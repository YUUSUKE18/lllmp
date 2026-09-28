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

    const queries = lines.map(line => parseInt(line, 10));
    
    // メモ化のためのマップ
    const memo: Map<number, number> = new Map();
    memo.set(1, 0);

    let total_steps = 0;

    for (const n of queries) {
        if (isNaN(n)) continue;

        let current_n = n;
        let steps = 0;

        // n が 1 になるまでの手順を計算
        while (current_n !== 1) {
            if (memo.has(current_n)) {
                // メモから取得
                steps += memo.get(current_n);
                break;
            }

            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }

        // 1 に到達したときのステップ数（再帰的/動的計画法的に計算）
        // ここでは、それぞれのクエリを独立に計算し、その和を求めるという指示の解釈に基づき、
        // 各クエリ n について、n -> ... -> 1 に到達する手数を計算し、その合計を求めることに焦点を当てます。
        
        // しかし、問題文の「n が 1 に到達するまでの手数を求めます。」と「すべてのクエリの手数の合計を求めます。」から、
        // これは通常、Collatz数列のステップ数を求める問題（3n+1問題）を指していると考えられます。
        // そして「計算結果をメモ化して高速化してください」という指示は、個々の数列の計算を高速化することを意味します。
        // 最後に「合計を求めます」という指示があるため、これは各クエリに対する数列の長さの合計を求めることを示唆します。

        // 再計算: 各クエリ n について、n から 1 へのステップ数を計算し、合計する。
        // メモ化は、もし同じ n が別のクエリで現れた場合に使われますが、今回はクエリごとに独立に計算します。
        // Collatz数列の性質上、1への到達は一意なので、nが1になるまでのステップ数を計算します。

        // 最初の計算を再実行し、memo化を適切に行います。
        
        // ここでは、個々のクエリ n に対して、n -> ... -> 1 に到達するまでのステップ数を計算します。
        // メモ化は、どの数から1へのステップ数を計算したかを記録します。
        
        const calculate_steps = (start_n: number): number => {
            if (start_n === 1) return 0;
            if (memo.has(start_n)) return memo.get(start_n)!;

            const path: number[] = [start_n];
            let current = start_n;
            
            // サイクル検出（ここでは簡単のため、1に到達するまでを試みる）
            // Collatz数列は必ず1に収束すると仮定します（これは未証明ですが、競技プログラミングでは通常そのように扱われます）。
            
            // サイクル検出を導入し、もしサイクルに入ったら（1以外で）エラーとするか、サイクル内のステップを計算します。
            // ただし、問題は「1に到達するまでの手数」なので、単に1に到達するまで続けます。

            let steps = 0;
            let temp_n = start_n;
            const history = new Map<number, number>(); // 数と、その数が出現したステップ数を記録

            while (temp_n !== 1) {
                if (memo.has(temp_n)) {
                    steps += memo.get(temp_n)!;
                    break;
                }
                
                if (history.has(temp_n)) {
                    // サイクルに入った場合。1以外でサイクルに入ったら、1に到達しないため、これは問題の意図と異なる。
                    // 通常、この問題設定ではサイクルは1とその前の要素のみになるため、
                    // 1に戻る過程で発見されたサイクルは無視されるか、それは1に到達する過程の計算に含まれると見なされます。
                    // ここでは、安全のため、サイクルに入った場合は計算を中断し、何もしない（ただし、メモ化された値を使う）。
                    break; 
                }

                history.set(temp_n, steps);
                
                if (temp_n % 2 === 0) {
                    temp_n /= 2;
                } else {
                    temp_n = 3 * temp_n + 1;
                }
                steps++;
            }
            
            // 1に到達したか、またはメモが見つかった場合、結果を更新
            if (temp_n === 1 || memo.has(temp_n)) {
                // 1に到達した、または途中でメモが見つかった場合
                // ここでは、到達したステップ数をメモに格納
                if (temp_n === 1) {
                    memo.set(start_n, steps);
                } else if (memo.has(temp_n)) {
                    // 途中からメモが見つかった場合、その情報も利用する
                    memo.set(start_n, steps + memo.get(temp_n)!);
                }
            }
            
            return steps;
        };


        // 最終的な合計を計算するために、各クエリに対して上記関数を呼び出し、結果を合計します。
        // ただし、メモ化の恩恵を最大限に受けるため、一度のループで全クエリを処理します。
        
        if (n === queries[0] && queries.length === 1) {
             // 単一クエリの場合、再実行
             const result = calculate_steps(n);
             total_steps = result;
        } else if (n === queries[0] && queries.length > 1) {
             // 最初のクエリのみを処理し、残りはまだ処理しない（実際には全クエリを合計する必要がある）
             // 課題の指示「すべてのクエリの手数の合計を求めます」に従い、全てのクエリを処理します。
             // 最初に処理した n の結果を、他の n についても利用できるようにメモ化に含める必要があります。
             
             // 矛盾を解消するため、最も安全な実装として、全クエリを処理します。
             // 再度、ループ構造を変更して、全クエリを処理する形にします。
        }
    }
    
    // 最終的な合計を計算するため、再構成します。
    const final_total_steps = 0;
    
    for (const n of queries) {
        if (isNaN(n)) continue;
        
        const start_n = n;
        if (memo.has(start_n)) {
            final_total_steps += memo.get(start_n)!;
        } else {
            // メモされていない場合は、再帰的な計算を（メモ化を更新しながら）実行
            let current_n = start_n;
            let steps = 0;
            const history = new Map<number, number>();
            
            while (current_n !== 1) {
                if (memo.has(current_n)) {
                    steps += memo.get(current_n)!;
                    break;
                }
                
                if (history.has(current_n)) {
                    break; 
                }

                history.set(current_n, steps);
                
                if (current_n % 2 === 0) {
                    current_n /= 2;
                } else {
                    current_n = 3 * current_n + 1;
                }
                steps++;
            }
            
            // 1に到達したか、または途中でメモが見つかった場合、結果をメモに格納
            if (current_n === 1 || memo.has(current_n)) {
                if (current_n === 1) {
                    memo.set(start_n, steps);
                } else if (memo.has(current_n)) {
                    memo.set(start_n, steps + memo.get(current_n)!);
                }
            }
            
            final_total_steps += steps;
        }
    }


    console.log(`total=${final_total_steps}`);
}

solve();
