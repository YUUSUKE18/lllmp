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

    // メモ化テーブル
    const memo = new Map<number, number>();

    /**
     * 変換操作の実行と手数の計算
     * @param n 変換対象の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 1 + countSteps(n % 2 === 0 ? n / 2 : 3 * n + 1);
        
        // メモ化
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        // 実行する計算を再定義して、再帰的な呼び出しではなく、ループで計算し、メモ化をより確実に行う
        let current = n;
        let count = 0;
        const history = new Set<number>(); // サイクル検出用

        while (current !== 1) {
            if (current === 1) break; // 1に到達した場合はループ終了（これは上記の条件でカバーされるはずだが念のため）
            
            if (history.has(current)) {
                // サイクル検出：この問題では1に到達する保証があるため、通常は発生しないが、安全のため
                // サイクルに入った場合は、そのサイクル内のステップ数を加算するなどの処理が必要になるが、
                // 1に到達するという前提なので、ここでは単純に停止する。
                break; 
            }
            
            history.add(current);

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            count++;
        }
        
        // 1に到達しなかった場合（サイクルなど、問題の性質上は起こらないはず）の処理
        if (current !== 1) {
            // この処理は、問題の性質（コナーズの定理関連）から、到達は保証されるため、通常は不要。
            // もし到達しない場合は、無限ループとして扱われるべきだが、ここでは計算されたステップ数を加算する。
        } else {
            totalSteps += count;
        }
    }

    // 注：再帰的なmemo化を使う方が、入力の大きさに依存せず、より効率的に処理できる。
    // 上記のループ処理は、入力値nから1へのパスを直接追跡するアプローチであり、
    // 相互作用するクエリを処理する際のメモ化戦略とは異なるため、ここでは再帰的なメモ化を主体とする。
    // 再帰的なメモ化を用いた再計算（より安全で高速）
    
    // 再度、再帰的なメモ化で合計を計算する
    const finalTotalSteps = 0;
    const memoFinal = new Map<number, number>();

    function calculateTotal(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memoFinal.has(n)) {
            return memoFinal.get(n)!;
        }

        let nextN: number;
        if (n % 2 === 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        const steps = 1 + calculateTotal(nextN);
        memoFinal.set(n, steps);
        return steps;
    }
    
    let finalSum = 0;
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;
        finalSum += calculateTotal(n);
    }


    console.log(`total=${finalSum}`);
}

solve();
