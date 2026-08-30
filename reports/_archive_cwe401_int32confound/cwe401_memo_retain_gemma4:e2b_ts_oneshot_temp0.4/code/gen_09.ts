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

    // 最初の行がクエリの開始値
    let n = parseInt(lines[0], 10);
    
    // メモ化のためのマップ
    const memo = new Map<number, number>();
    
    // 合計を保持する変数
    let total_steps = 0;

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
     * @param start n の初期値
     * @returns 1 に到達するまでの手数
     */
    function calculate_steps(start: number): number {
        if (start === 1) {
            return 0;
        }
        if (memo.has(start)) {
            return memo.get(start)!;
        }

        let current = start;
        let steps = 0;
        
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路の逆を計算するのではなく、元の問題の意図を再確認する。
        // 問題文: "n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
        // これは、通常のコネルの予想（3n+1問題）の逆操作ではなく、与えられた操作を繰り返す手順を数える問題である。
        // ここでは、与えられた操作を繰り返して1に到達するまでのステップ数を数える。
        
        // 再度、操作を繰り返してステップ数を計算する。
        // 実際には、この問題は「nから1に到達するまでの操作回数」を求める、という操作の逆を考えるのではなく、
        // 与えられた操作を適用し続ける過程を数える、という問題である。
        
        // 最初のループで計算したstepsが正しい。
        memo.set(start, steps);
        return steps;
    }

    // 最初のクエリ n について計算
    if (isNaN(n) || n < 1) {
        // 最初の入力が不正な場合は、次の入力を試みるか、0とするか。
        // 仕様に基づき、入力が1以上の整数と仮定する。
        // ここでは、最初の入力が不正な場合は処理を終了する。
        console.log(`total=0`);
        return;
    }
    
    const steps = calculate_steps(n);
    total_steps += steps;

    // 残りの行を処理
    for (let i = 1; i < lines.length; i++) {
        const next_n = parseInt(lines[i], 10);
        if (!isNaN(next_n) && next_n >= 1) {
            const next_steps = calculate_steps(next_n);
            total_steps += next_steps;
        }
    }

    console.log(`total=${total_steps}`);
}

solve();
