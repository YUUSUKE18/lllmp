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

    // 最初の行がクエリの数であると仮定する（問題文の解釈が曖昧なため、一般的な「整数列」の読み取り方を適用する）
    // 仕様：「標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」
    // これは、入力全体がクエリのリストであると解釈する。
    
    const queries = lines.map(Number);
    
    if (isNaN(queries).some(isNaN)) {
        // 整数として解釈できない行は無視する、という指示に従う
        // 今回は、読み込んだ行がすべて整数であると仮定して進める。
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) return 0;
        if (memo.has(n)) return memo.get(n)!;

        let currentN = n;
        const steps = [];

        while (currentN !== 1) {
            steps.push(currentN);
            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
        }
        
        // 1に到達するまでの手数は、ステップの数 + 1 (最後の1への遷移) ではない。
        // 問題文の「n が 1 のときの手数は 0 です」に基づき、1への遷移回数を数える。
        // 実際には、操作を繰り返して1に到達するまでの回数を数える。
        // 1からnへの操作の逆を考えると、これは非常に複雑になる。
        // ここでは、与えられた操作を繰り返す手数を数える。
        
        // 再計算: 1に到達するまでの操作回数を数える。
        let count = 0;
        let tempN = n;
        while (tempN !== 1) {
            if (tempN % 2 === 0) {
                tempN /= 2;
            } else {
                tempN = 3 * tempN + 1;
            }
            count++;
        }
        
        memo.set(n, count);
        return count;
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (n >= 1) {
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
