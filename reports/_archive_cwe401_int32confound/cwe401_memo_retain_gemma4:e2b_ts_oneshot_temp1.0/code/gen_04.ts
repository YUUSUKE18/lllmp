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

    const initialNumbers = lines.map(line => parseInt(line, 10));
    
    // メモ化テーブル: number -> steps
    const memo = new Map<number, number>();
    memo.set(1, 0);

    let totalSteps = 0;

    for (const n of initialNumbers) {
        if (isNaN(n) || n < 1) continue;

        let currentN = n;
        let steps = 0;
        const path: number[] = []; // 計算過程を記録してメモ化に利用

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                steps += memo.get(currentN);
                break;
            }
            
            path.push(currentN);
            
            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }
        
        // 1に到達するまでの手数を計算し、メモ化する
        if (currentN === 1) {
            // 逆順にメモ化
            for (let i = path.length - 1; i >= 0; i--) {
                const num = path[i];
                memo.set(num, steps - (path.length - 1 - i)); // 既に計算済みのステップ数を考慮して計算
            }
            
            // 最終的なステップ数を計算し、合計に加算
            const finalSteps = steps;
            totalSteps += finalSteps;
        }
    }

    // 最終的な合計を出力
    console.log(`total=${totalSteps}`);
}

solve();
