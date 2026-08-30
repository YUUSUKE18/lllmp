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
    const initialNumbers = lines.map(line => parseInt(line, 10));
    
    // 2. メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    // 3. 繰り返し操作の関数 (メモ化付き)
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const steps = [];
        
        // 1に到達するまでの経路を記録し、メモ化のために逆順で計算する
        while (current !== 1) {
            steps.push(current);
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // 経路を逆順にして、各ステップでの手数を計算する
        // 実際には、nから1に到達するまでの操作の回数を数える必要がある。
        // ここでは、nから1に到達するまでの操作の回数を直接計算する。
        
        let count = 0;
        let temp = n;
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp /= 2;
            } else {
                temp = 3 * temp + 1;
            }
            count++;
        }
        
        // 経路上のすべての値のメモ化（これは問題の要求ではないが、高速化のため）
        // ただし、問題は「nが1に到達するまでの手数」なので、nから1へのパスの長さを求める。
        // 経路上の各値のメモ化は、もし「各値が1に到達するまでの手数」を求めるなら必要になる。
        // 今回は「nが1に到達するまでの手数」のみを求めるため、上記で求めた count を返す。
        
        memo.set(n, count);
        return count;
    }

    // 4. 全クエリの処理と合計の計算
    let totalSteps = 0;
    for (const n of initialNumbers) {
        if (n >= 1) {
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    // 5. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
