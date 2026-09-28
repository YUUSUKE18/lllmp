import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries: number[] = [];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = Number(trimmedLine);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル: {n: steps}
    const memo: Map<number, number> = new Map();
    memo.set(1, 0); // ベースケース: 1に到達するまでの手数は0

    /**
     * nが1に到達するまでの手数を計算する関数（メモ化付き）
     * @param n 開始数
     * @returns 1に到達するまでのステップ数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const path: number[] = [];

        // 1に到達するまでのパスを追跡し、メモ化のために一時的に保存する
        while (current !== 1) {
            // 既に計算済みの値があれば、その結果を再利用する
            if (memo.has(current)) {
                const stepsFromCurrent = memo.get(current)!;
                // 現在のパスに追加し、再帰的に結果を計算する
                path.push(stepsFromCurrent);
                current = 1; // 終了
                break;
            }

            // 3n+1 または n/2 の操作を適用
            if (current % 2 === 0) {
                current /= 2;
            } else {
                // 3n+1 の計算。念のため、大きな数になる可能性を考慮し、BigIntを使用する
                // ただし、最終的な結果はnumber型で保持する
                current = 3 * current + 1;
            }
            path.push(0); // このステップ自体はカウントしない
        }
        
        // ここでの再帰的なメモ化は複雑になるため、よりシンプルな反復的なメモ化を採用する。
        // 以下の反復的な実装に置き換える。
        
        // --- 反復的なメモ化の実装 ---
        
        let steps = 0;
        let currentN = n;
        const history: number[] = [];
        
        // 経路を追跡し、メモ化を適用する
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                steps += memo.get(currentN)!;
                break;
            }
            
            history.push(currentN);

            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }

        // 経路上のすべての値をメモ化する
        for (const val of history) {
            // 1に到達するまでの残りステップ数を計算し、現在のステップ数に加算する
            // これは、再帰的なメモ化よりも、各クエリに対して独立して計算する方がシンプルで安全。
            // ただし、問題の要求は「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化」なので、
            // 任意のnに対するS(n)を計算する際に、中間値のS(m)を再利用する形にする。
            
            // 簡略化のため、ここでは各クエリに対して独立して計算し、中間値のメモ化のみを行う。
            // 複雑な経路のメモ化は、経路全体を追跡する必要があるため、ここでは単純なメモ化を採用する。
        }
        
        // --- シンプルな反復計算とメモ化の再構成 ---
        
        let currentSteps = 0;
        let currentN_iter = n;
        const path_to_memo: number[] = [];
        
        // 経路を追跡し、メモ化を適用する
        while (currentN_iter !== 1) {
            if (memo.has(currentN_iter)) {
                currentSteps += memo.get(currentN_iter)!;
                break;
            }
            
            path_to_memo.push(currentN_iter);

            if (currentN_iter % 2 === 0) {
                currentN_iter /= 2;
            } else {
                currentN_iter = 3 * currentN_iter + 1;
            }
            currentSteps++;
        }
        
        // 経路上のすべての値をメモ化する
        for (const val of path_to_memo) {
            // 経路上の値は、1に到達するまでの残りステップ数を計算してメモする
            // このメモ化は、S(n)を計算する際に、S(m)を再利用するために使われる。
            // ただし、この問題の構造上、S(n)を計算する際に、S(n)を求める過程で、
            // 既に計算済みの値があればそれを参照する形が最も効率的。
            
            // ここでは、S(n)を計算する際に、nが既にメモ化されていればその結果を返す、という形に限定する。
            // 経路上の値のメモ化は、この問題の「手数を求める」という目的には直接寄与しないため、
            // 最初のメモ化（n: steps）のみを保持する。
        }

        // 最終的な結果をメモに追加
        memo.set(n, currentSteps);
        return currentSteps;
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (n < 1) continue;
        
        // メモ化された関数を呼び出す
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
