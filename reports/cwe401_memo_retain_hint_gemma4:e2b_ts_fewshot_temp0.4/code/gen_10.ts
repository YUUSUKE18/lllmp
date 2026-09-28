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

    // 最初の行がクエリの数であると仮定するが、仕様に基づき、入力全体を整数として処理する
    // 実際には、入力がスペース区切りの整数列であると解釈する
    const numbers = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n));

    if (numbers.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    let total_steps = 0;

    /**
     * 置き換え操作を繰り返して 1 に到達するまでの手数を計算する関数
     * @param n 初期値
     * @returns 1 に到達するまでの手数
     */
    function calculate_steps(n: number): number {
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
        
        // メモ化
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリに対して計算と合計を行う
    for (const n of numbers) {
        // 64bit整数に収まる範囲で計算を行う
        const steps = calculate_steps(n);
        total_steps += steps;
    }

    // 結果を出力
    console.log(`total=${total_steps}`);
}

solve();
