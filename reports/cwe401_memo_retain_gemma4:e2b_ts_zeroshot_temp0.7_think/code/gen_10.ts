import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (!input) {
        console.log("total=0");
        return;
    }

    // 行ごとに整数をパースする
    const lines = input.split('\n');
    
    let totalSteps = 0;
    // メモ化のためのキャッシュ (Mapを使用)
    const memo = new Map<number, number>();

    for (const line of lines) {
        const nStr = line.trim();
        if (nStr === "") continue;

        const n = parseInt(nStr, 10);

        // 整数として解釈できない行は無視する（parseIntで失敗した場合、NaNになるためチェック）
        if (isNaN(n)) continue;

        // n=1 の場合は手数は 0
        if (n === 1) {
            // 1が出現しても、これはクエリとしての結果ではなく、計算途中の値として扱われる。
            // ここでは、nがクエリとして与えられた値であると仮定し、n=1の計算結果をメモ化する。
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            continue;
        }

        // メモ化された結果があればそれを使用
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
            continue;
        }

        // 手数計算 (Collatz操作)
        let currentN = n;
        let steps = 0;
        
        // 繰り返し計算とメモ化
        const path = [];
        let tempN = n;
        
        // サイクル検出と手数の計算
        while (tempN !== 1) {
            // 既に計算済みの値があれば、その結果を再利用する
            if (memo.has(tempN)) {
                steps += memo.get(tempN)!;
                break;
            }
            
            path.push(tempN);
            
            if (tempN % 2 === 0) {
                tempN /= 2;
            } else {
                // 3n + 1
                tempN = 3 * tempN + 1;
            }
            steps++;
        }

        // 最終的な手数を計算し、経路上のすべての値をメモ化する
        // 逆順に計算することで、経路上のすべての値の手数を効率的に計算する
        let currentStepCount = steps;
        for (let i = path.length - 1; i >= 0; i--) {
            const val = path[i];
            if (!memo.has(val)) {
                // val から 1 に到達するまでの手数を計算し、格納する
                let temp = val;
                let count = 0;
                while (temp !== 1) {
                    if (temp % 2 === 0) {
                        temp /= 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    count++;
                }
                memo.set(val, count);
            }
        }

        // n から 1 への手数を加算
        totalSteps += steps;
        
        // n そのものもメモ化
        memo.set(n, steps);
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
