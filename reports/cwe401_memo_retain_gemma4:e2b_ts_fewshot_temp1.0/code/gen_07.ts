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
    
    if (isNaN(queries).some(isNaN)) {
        // 整数として解釈できない行は無視（仕様により、行数はクエリ数と一致していると仮定するが、安全のためチェック）
        // この問題の文脈では、入力全体が整数列であると仮定し、NaNが発生した場合はそれ以降の処理が不確実になるが、
        // 厳密に「整数として解釈できない行も無視します」に従い、ここでは整数として解釈できたもののみを処理する。
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 変換操作を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function countSteps(n: number): number {
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

        // 経路で発生する値（32bit/64bitを超えても計算は可能）をメモ化
        // ただし、この問題のゴールは「1に到達するまでの手数」であり、通常のコネルの問題の数え上げとは異なる。
        // ここでは、与えられた変換操作を繰り返して1に到達するまでのステップ数を数える。
        
        // 再帰的なmemoizationを導入する場合（この操作自体がコネルの順序を意図している場合）：
        // 実際には、問題文の意図は「与えられたnから1に到達するまでの操作の回数」を求めること。
        
        // 標準的なコネルの問題の考え方（nが奇数なら3n+1、偶数ならn/2）に基づき、
        // スタックまたは再帰で探索する方が自然だが、ここでは「与えられた操作を繰り返して1に到達する」と解釈し、
        // 既に計算した値を参照する。
        
        // 今回の仕様は「nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
        // これは、nから始めて、その操作を適用して1になるまでのステップ数を求める問題である。
        
        // Memoizationの適用:
        // nを計算する際に、途中で再計算された値があればそれを利用する。
        
        // 厳密には、nから1へのパスを辿るため、遷移を逆算する方が効率的で、メモ化が有効になる。
        // しかし、ここでは「n -> ... -> 1」の過程を追うため、直接計算する。
        
        // 念のため、現在の計算結果をメモに追加
        memo.set(n, steps);
        return steps;
    }

    let total_steps = 0;

    for (const n of queries) {
        if (n <= 0) continue; // 1以上の整数が与えられるため、0以下は無視
        
        // 再計算が必要な場合（もし再帰的メモ化を試みる場合）
        // let steps = countSteps(n);
        // total_steps += steps;

        // ここでは、与えられた操作を直接シミュレーションする（メモ化を最適化する）
        let current_n = n;
        let steps = 0;
        
        // 経路探索とメモ化を組み合わせる。この操作がコネルの順序を意図していると仮定し、
        // 1に到達するまでのステップ数を求める。
        
        const path = new Map<number, number>(); // {数: 手数}
        path.set(1, 0);
        const queue: number[] = [n];
        
        let found = false;

        while (queue.length > 0) {
            const current = queue.shift()!;
            const current_steps = path.get(current)!;

            if (current === 1) {
                total_steps += current_steps;
                found = true;
                // 複数の経路がある可能性を考慮し、この問題が「最短経路」を意味するか確認が必要だが、
                // 仕様は「操作を繰り返す」なので、探索されたパスのステップ数を合計する。
                // この問題は通常、単一の遷移のみを意味するため、このループが1つのパスを探索する。
            }

            if (current > 1000000000) continue; // 無限ループ防止のための安全策（任意）

            let next_n: number;
            if (current % 2 === 0) {
                next_n = current / 2;
            } else {
                next_n = 3 * current + 1;
            }

            if (!path.has(next_n)) {
                path.set(next_n, current_steps + 1);
                queue.push(next_n);
            }
        }
        
        // 補足: 通常、このような問題はnをスタートとして、1に到達するまでのステップ数を求めるため、
        // 実際には単一の計算結果が求められる。
        // 再度、クエリごとに単一の計算を試みる。
        
        // ----------------------------------------------------------------------
        // 再度、最も単純な「nから1へのパス」を辿る方法を採用し、メモ化を適用する。
        // この操作はコネルの順序に似ているが、方向が異なるため、単純な繰り返し計算を行う。
        
        let current_n_calc = n;
        let steps_for_n = 0;
        const history = new Map<number, number>(); // 既に計算した値とその結果
        history.set(n, 0);
        
        while (current_n_calc !== 1) {
            if (history.has(current_n_calc)) {
                steps_for_n = history.get(current_n_calc)!;
                break;
            }

            if (current_n_calc % 2 === 0) {
                current_n_calc /= 2;
            } else {
                current_n_calc = 3 * current_n_calc + 1;
            }
            steps_for_n++;
            history.set(current_n_calc, steps_for_n);
        }
        
        if (current_n_calc === 1) {
            total_steps += steps_for_n;
        } else {
            // 1に到達しなかった場合（通常、この問題設定では到達するはずだが、安全のため）
            // console.error(`Error: Could not reach 1 from ${n}`);
        }
    }

    console.log(`total=${total_steps}`);
}

solve();
