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

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    let total_steps = 0;

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する関数 (ハミルトン問題)
     * @param n 初期値
     * @returns 1に到達するまでの手数
     */
    function calculate_steps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current_n = n;
        let steps = 0;
        
        // 計算途中でループが無限になる可能性があるため、安全策として最大回数を設定する（安全のため、この問題の文脈では通常到達するはずだが、念のため）
        const MAX_ITERATIONS = 1000000; 

        while (current_n !== 1 && steps < MAX_ITERATIONS) {
            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }

        if (current_n === 1) {
            memo.set(n, steps);
            return steps;
        } else {
            // 安全策に達した場合（理論上は到達するはずだが、念のため）
            // この問題では、1に到達することを前提としているため、到達しない場合はエラーとするか、あるいはその値で計算を続ける必要があるが、
            // 競技プログラミングの文脈では、この操作は必ず1に収束すると仮定される。
            // ここでは、到達しなかった場合はエラーとして処理を中断するのではなく、計算されたステップ数を返す。
            // ただし、問題の制約上、このパスは通常発生しない。
            // 実際には、この問題は「手数を求める」というより「遷移の回数」を求めるため、
            // 1に到達するまでの最短経路を求めることを意味する。
            // 1に到達しない場合は、その経路の長さは計算できない、または無限大と見なすことになるが、
            // ここでは、もし到達しなかったとしても、その計算過程で得られたステップ数を採用する（これは通常ありえない）。
            // 実際のハミルトン問題の文脈では、これは「nが1に収束するまでのステップ数」を意味する。
            // 1に到達しない場合、これは入力の制約違反または問題の解釈の誤りとなるが、
            // 設問の意図に従い、1に到達したと仮定して終了する。
            // 念のため、このケースは発生しないと仮定し、到達したと見なす。
            // 実際には、この遷移は必ず1に収束する（Collatz Conjecture）。
            throw new Error(`Failed to reach 1 from ${n} within ${MAX_ITERATIONS} steps.`);
        }
    }

    for (const line of lines) {
        let n;
        const num = parseInt(line, 10);
        if (!isNaN(num) && num >= 1) {
            n = num;
            try {
                const steps = calculate_steps(n);
                total_steps += steps;
            } catch (e) {
                // エラー処理（通常は発生しない想定）
                // console.error(`Error processing ${n}: ${e.message}`);
            }
        }
    }

    console.log(`total=${total_steps}`);
}

solve();
