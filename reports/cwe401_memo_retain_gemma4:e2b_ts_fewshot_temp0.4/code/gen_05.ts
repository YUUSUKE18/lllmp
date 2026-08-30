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
        // 整数として解釈できない行は無視する (仕様に基づき、ここでは無視する)
        // ただし、入力が厳密に「1 以上の整数が 1 行に 1 個ずつ並ぶ」という前提なので、
        // 実際にはこのチェックは厳密には不要だが、堅牢性のために残す。
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する
     * @param n 開始値
     * @returns 1に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;
        
        // 1に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
            
            // 非常に大きな数になる可能性があるため、64bit整数として扱う
            // JavaScriptのNumber型はIEEE 754倍精度浮動小数点数であり、安全な整数範囲は2^53程度。
            // 64bit整数（2^63-1）まで安全に扱える。
            // 途中でオーバーフローしないか、またはメモ化キーとして適切かを考慮する。
            // この問題は通常、手数を求める問題であり、nが非常に大きくなる場合は、
            // 実行時間制限や数値型の制約を考慮する必要があるが、ここでは指示に従い計算を続行する。
        }

        // 経路圧縮（メモ化）
        // 逆方向の計算（n -> 1）ではなく、順方向の計算（n -> ... -> 1）でメモ化する。
        // ただし、この問題は「nが1になるまでの手数」を求めるので、
        // 逆操作（n -> n/2 or (n-1)/3）で1に到達するまでの最短経路を求めるのが一般的だが、
        // ここでは与えられた操作をそのまま適用し、メモ化する。
        
        // 逆操作でメモ化を試みる（より効率的になる可能性が高い）
        // 逆操作:
        // 1. n が偶数なら n/2 または 2n (元の操作が n/2 だったので、2n)
        // 2. n が 3k+1 なら (n-1)/3 (元の操作が 3n+1 だったので、(n-1)/3)
        
        // 逆操作で1に到達するまでの手数を求める方が、元の操作を繰り返すよりも計算が速い。
        
        // ここでは、元の操作を繰り返す方法でメモ化する。
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (n >= 1) {
            const steps = calculateSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
