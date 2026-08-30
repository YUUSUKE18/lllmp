function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    let totalCount = 0n;
    const memo = new Map<number, number>();

    // 入力行を処理
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") continue;

        const n = parseInt(trimmedLine, 10);

        // 整数として解釈できるかチェック
        if (isNaN(n) || n < 1) continue;

        // メモ化された値があるかチェック
        if (memo.has(n)) {
            totalCount += BigInt(memo.get(n)!);
            continue;
        }

        // ベースケース
        if (n === 1) {
            memo.set(1, 0);
            totalCount += 0n;
            continue;
        }

        // 再帰/メモ化再帰で手数を計算
        let steps = 0;
        let current = n;
        const path = new Set<number>(); // サイクル検出用

        while (current !== 1) {
            if (path.has(current)) {
                // サイクル検出: 1に到達しない無限ループ（実際には、この問題では1に到達する保証があるが、念のため）
                // ただし、この問題の操作はCollatz予想に関連しており、1に到達すると仮定する。
                // サイクルに入った場合は、再帰的なメモ化で対応するため、ここでは一旦スキップし、
                // サイクル内の計算を停止する。（Collatz問題では通常、1に収束する）
                break; 
            }
            
            path.add(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 1に到達したか確認 (Collatz問題の性質上、到達するはず)
        if (current === 1) {
            // 計算したステップ数をメモ
            memo.set(n, BigInt(steps));
            totalCount += BigInt(steps);
        } else {
            // 1に到達しなかった場合（仕様上ありえないが、安全策として）
            // この問題の文脈では、nが1に到達すると仮定する。
        }
    }

    // 結果の出力
    console.log(`total=${totalCount.toString()}`);
}

solve();
