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
    const queries = [];
    for (const line of lines) {
        const num = parseInt(line, 10);
        if (!isNaN(num) && num >= 1) {
            queries.push(num);
        }
    }

    // 2. メモ化された関数 (Memoization)
    const memo = new Map<number, number>();

    /**
     * 変換操作を繰り返し、1に到達するまでの手数を計算する
     * @param n 開始値
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
        
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値をメモ化する（これは不要かもしれないが、問題文の意図を考慮し、到達した値の経路を追うのではなく、単にnから1へのパスを数える）
        // ここでは、nから1へのパスを数えるため、再帰的に呼び出すか、現在のパスを追うのが自然。
        // しかし、問題文は「nが1に到達するまでの手数を求めよ」なので、このwhileループが求めるべき手数である。
        
        // 経路上の値をメモ化する（この問題では、各クエリが独立しているため、この関数内で計算した結果を保存する）
        memo.set(n, steps);
        return steps;
    }

    // 3. 全クエリの処理と合計の計算
    let totalSteps = 0;
    
    // 各クエリに対して計算を実行し、メモ化を更新する
    for (const n of queries) {
        // 実際には、各クエリ n について countSteps(n) を計算する
        // この問題は、各クエリ n について、nから1へのパスを数えることを要求している。
        // したがって、memo化は、同じ n が再登場した場合に役立つ。
        
        // ただし、問題文の「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」は、
        // 複数のクエリ n_i が与えられたとき、n_i から 1 へのパスを計算する際に、
        // 途中で現れる値が同じであれば再利用することを意味する。
        // 実際には、各クエリ n について独立に計算し、その結果を合計する。
        
        // 経路の計算を再定義し、メモ化を適用する
        let current_n = n;
        let steps = 0;
        
        // 経路を追跡し、メモ化を適用する
        const path = [];
        const visited = new Set<number>();
        
        while (current_n !== 1) {
            if (current_n === 1) break; // 既に1に到達した場合は終了
            
            if (memo.has(current_n)) {
                // メモ化された値があれば、そこから1への残りステップを計算する
                const memo_steps = memo.get(current_n)!;
                steps += memo_steps;
                current_n = 1; // 終了
                break;
            }

            // 経路を追跡し、再帰的に計算するのではなく、直接進める
            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
            path.push(current_n);
        }
        
        // 最終的な手数を合計に加算
        totalSteps += steps;

        // 経路上の値をメモ化する (これは、もし同じ値が別のクエリで現れた場合のために、その値から1へのパスを計算する際に役立つ)
        // ここでのメモ化は、nから1へのパスを計算する際に、中間値が再利用されることを意図していると解釈する。
        // しかし、この問題の構造上、各クエリ n について独立に計算する方が自然。
        // 厳密に「nが1に到達するまでの手数を求めよ」に従うと、上記のwhileループで求めたstepsが答え。
        // メモ化は、この計算を高速化するために、nが非常に大きい場合に役立つ。
        
        // 経路上の値をメモ化する（これは、この問題の構造上、nから1へのパスを計算する際に、中間値が再利用されることを意図していると解釈する）
        // 実際には、この問題はCollatz予想に関連しており、各nから1へのパスを数えることが求められている。
        // したがって、各クエリ n について、上記で計算した steps を totalSteps に加算する。
    }

    // 4. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
