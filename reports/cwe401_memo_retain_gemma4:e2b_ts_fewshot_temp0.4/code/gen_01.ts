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

    // 最初の行をクエリとして扱う
    let n = parseInt(lines[0], 10);
    if (isNaN(n)) {
        // 最初の行が整数でない場合は無視（仕様上は1以上の整数が並ぶと仮定）
        console.log("total=0");
        return;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();

    /**
     * 置き換え操作を繰り返し、1に到達するまでの手数を計算する
     * @param start 開始値
     * @returns 1に到達するまでの手数
     */
    function calculateSteps(start: number): number {
        if (start === 1) {
            return 0;
        }
        if (memo.has(start)) {
            return memo.get(start)!;
        }

        let current = start;
        let steps = 0;
        
        // 3x+1問題の解法（コナーの定理に基づく）
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        memo.set(start, steps);
        return steps;
    }

    let totalSteps = 0;

    // 2行目以降のクエリを処理
    for (let i = 1; i < lines.length; i++) {
        const query = parseInt(lines[i], 10);
        if (!isNaN(query)) {
            const steps = calculateSteps(query);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
