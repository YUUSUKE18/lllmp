const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const queries = lines.map(line => parseInt(line, 10));

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 繰り返し操作の手数を再帰的に計算する関数（メモ化付き）
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
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

        // 経路を遡ってメモ化する（より効率的）
        // 再帰的な呼び出しではなく、直接計算した経路を記録する方が、
        // 多くのクエリが同じ経路を共有する場合に有効だが、
        // ここではクエリごとに計算し、その結果をメモ化するアプローチを採用する。
        // ただし、問題の要求は「各クエリの手数の合計」であり、
        // 各 n について直接計算する方が、メモ化の恩恵を最大限に受ける。
        
        // 暫定的に、現在の n から 1 までの最短経路を計算し、memo に記録する。
        // ただし、これはクエリごとに実行されるため、一般的な「手数の合計」問題（スタックやDP）とは少し異なる。
        // ここでは、各クエリ n についての手数を計算し、その合計を求める。
        
        // 再帰的なメモ化の形に戻す
        // 実際には、この問題は「各 n についての手数を計算し、合計する」という操作なので、
        // 個々の n に対して計算を繰り返し、その結果を合計する。
        
        // 再帰的なメモ化を再実装する。
        
        return steps;
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (n < 1) continue;
        
        // メモ化を再利用して計算
        let steps = 0;
        let current_n = n;
        
        // 経路の計算とメモ化の統合（これはスタック/DPでより自然になるが、ここでは直接計算）
        // 経路を追跡して、重複を避けるためにメモ化を利用する。
        const path: number[] = [];
        let temp = n;
        
        while (temp !== 1) {
            if (memo.has(temp)) {
                // 既に計算済みの部分があれば、そこから計算を続ける
                const known_steps = memo.get(temp)!;
                steps += known_steps;
                // このアプローチは、nから1への経路を遡るのではなく、nから1への最短経路を求めるため、
                // 単純な再帰メモ化が最も適切。
                // ここでは、クエリごとに n から 1 への最短経路を計算する。
                break; // 単純計算に戻す
            }

            path.push(temp);
            if (temp % 2 === 0) {
                temp = temp / 2;
            } else {
                temp = 3 * temp + 1;
            }
            steps++;
        }
        
        // 経路を遡って、計算したステップ数をメモ化する
        // この問題は「n から 1 への操作の回数」を問うため、
        // 実際には、各 n について上記ループで計算した `steps` がそのクエリの手数となる。
        
        // 再計算して、メモ化を適用する（最も安全）
        
        let current_total_steps = 0;
        let current_n_for_memo = n;
        
        // 経路計算とメモ化
        const trace: { [key: number]: number } = {}; // { n: steps }
        
        function findSteps(num: number): number {
            if (num === 1) return 0;
            if (trace[num] !== undefined) return trace[num];

            let steps = 0;
            let current = num;
            const history: number[] = [];

            while (current !== 1) {
                history.push(current);
                if (current % 2 === 0) {
                    current = current / 2;
                } else {
                    current = 3 * current + 1;
                }
                steps++;
            }

            // 経路を逆順に辿って、メモ化する
            let current_n_ptr = num;
            let current_steps_ptr = steps;
            
            // 逆順に処理してメモ化を更新する（この操作は複雑なので、単に結果を返すことにする）
            trace[num] = steps;
            return steps;
        }

        totalSteps += findSteps(n);
    }

    // 最終的な合計を出力
    console.log(`total=${totalSteps}`);
}

solve();
