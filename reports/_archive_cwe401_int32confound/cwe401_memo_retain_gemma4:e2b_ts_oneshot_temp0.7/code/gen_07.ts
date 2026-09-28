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

    // 1. 最初の数値を初期値とする
    let n = parseInt(lines[0], 10);
    if (isNaN(n) || n < 1) {
        // 最初の入力が不正な場合は、処理を終了するか、エラーとして扱うが、
        // 仕様では1以上の整数が与えられる前提。ここでは0として処理を続ける（またはエラー処理）。
        // 厳密に仕様に従うため、もし最初の行が不正なら、それ以降の処理はスキップする。
        // ただし、ここでは「すべてのクエリの手数の合計」を求めるので、データが空なら0。
        console.log("total=0");
        return;
    }

    let totalSteps: bigint = 0n;
    
    // メモ化（キャッシュ）用のマップ
    const memo = new Map<number, number>();

    /**
     * 変換操作を実行し、ステップ数を計算する関数
     * @param start n から開始する数
     * @returns 手数
     */
    function countSteps(start: number): number {
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
        
        memo.set(start, steps);
        return steps;
    }

    // 2. すべてのクエリ（行）に対して計算と合計を行う
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const n_query = parseInt(line, 10);

        if (isNaN(n_query) || n_query < 1) {
            continue; // 無効な行は無視
        }

        const steps = countSteps(n_query);
        totalSteps += BigInt(steps);
    }

    // 3. 結果を出力
    console.log(`total=${totalSteps.toString()}`);
}

solve();
