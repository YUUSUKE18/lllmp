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

    // 処理対象の数値を格納する配列
    const numbers: number[] = lines.map(Number);
    
    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    memo.set(1, 0);

    let totalSteps = 0;

    for (const n of numbers) {
        if (isNaN(n)) continue;

        let current = n;
        let steps = 0;
        const path: number[] = []; // 経路を記録してメモ化に利用する

        while (current !== 1) {
            if (memo.has(current)) {
                steps += memo.get(current);
                break;
            }
            
            path.push(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 経路を遡ってメモ化する
        for (let i = path.length - 1; i >= 0; i--) {
            const num = path[i];
            // 現在のステップ数 (steps - i) を計算
            const stepsFromN = steps - i;
            memo.set(num, stepsFromN);
        }
        
        // 最終結果を加算
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
