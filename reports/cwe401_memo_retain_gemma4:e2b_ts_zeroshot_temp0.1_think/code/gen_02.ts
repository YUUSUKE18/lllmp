import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 行ごとに分割し、整数としてパースする
    const lines = input.split('\n');
    
    let totalSteps = 0;
    // メモ化テーブル: 既に計算済みの値とその手数を格納する
    const memo = new Map<number, number>();

    for (const line of lines) {
        const nStr = line.trim();
        if (nStr === "") continue;

        const n = parseInt(nStr, 10);

        // 整数として有効かチェック
        if (isNaN(n)) continue;

        if (n === 1) {
            // n=1 の場合は手数は 0
            if (!memo.has(1)) {
                memo.set(1, 0);
            }
            // 1 のクエリに対する手数を加算
            totalSteps += memo.get(1)!;
            continue;
        }

        // n が既にメモ化されているか確認
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
            continue;
        }

        // n が未計算の場合、計算を実行する
        let current = n;
        const path: number[] = []; // 経路を記録する配列
        
        // 1 に到達するまでの経路を探索し、中間結果をメモ化する
        while (current !== 1) {
            // 既に計算済みの値があれば、その結果を再利用する
            if (memo.has(current)) {
                const steps = memo.get(current)!;
                // 現在の経路の長さ = steps + (現在のステップ数)
                const currentSteps = steps + path.length;
                
                // 経路を逆順に追加
                for (let i = path.length - 1; i >= 0; i--) {
                    path[i] = currentSteps;
                }
                
                // 経路を終了
                totalSteps += currentSteps;
                break;
            }

            // 新しい値を記録
            path.push(current);

            // Collatz操作の適用
            if (current % 2 === 0) {
                current /= 2;
            } else {
                // 3n + 1
                current = 3 * current + 1;
            }
        }

        // ループが終了した場合（1に到達した場合）
        if (current === 1) {
            // 1 に到達するまでの手数を計算し、メモ化する
            const steps = path.length;
            memo.set(n, steps);
            totalSteps += steps;
        }
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
