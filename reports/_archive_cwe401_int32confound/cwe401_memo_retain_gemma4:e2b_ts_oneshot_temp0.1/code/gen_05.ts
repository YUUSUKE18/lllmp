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

    // 最初の行がクエリの数と仮定するが、仕様に従い、入力全体を整数として処理する
    // 実際には、入力が「1 2 3 ...」という形式で、各行がクエリ n であると解釈する
    // 例: 入力が "2\n3\n1" の場合、n=2, n=3, n=1 の順に処理する。
    
    let totalSteps = 0;
    const memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // nが1のときの手数は0
            // memo.set(1, 0); // 1はベースケースなので明示的に設定しなくても良いが、念のため
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            totalSteps += memo.get(n);
            continue;
        }

        // 再帰または反復計算で手数を求める
        let currentN = n;
        let steps = 0;
        const path = []; // 経路を記録してメモ化に利用する

        while (currentN !== 1) {
            if (memo.has(currentN)) {
                steps += memo.get(currentN);
                break;
            }
            
            path.push(currentN);
            
            if (currentN % 2 === 0) {
                currentN = currentN / 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            steps++;
        }
        
        // 1に到達したときのステップ数を計算し、経路を遡ってメモ化する
        // ここでは、nから1に到達するまでのステップ数を直接計算する
        
        let currentSteps = 0;
        let tempN = n;
        const history: number[] = [];
        
        while (tempN !== 1) {
            history.push(tempN);
            if (tempN % 2 === 0) {
                tempN /= 2;
            } else {
                tempN = 3 * tempN + 1;
            }
            currentSteps++;
        }
        
        // 1に到達するまでのステップ数は history.length
        const resultSteps = history.length;
        
        // 経路を遡ってメモ化する
        for (let i = history.length - 1; i >= 0; i--) {
            const node = history[i];
            // nodeから1に到達するまでのステップ数を計算し、memoに保存する
            let stepsFromNode = 0;
            let current = node;
            while (current !== 1) {
                if (current % 2 === 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
                stepsFromNode++;
            }
            memo.set(node, stepsFromNode);
        }

        totalSteps += resultSteps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
