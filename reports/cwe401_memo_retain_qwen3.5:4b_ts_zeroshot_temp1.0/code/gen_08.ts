const memo = new Map<number, number>();

function getSteps(n: number): number {
    if (n === 1) return 0;
    const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
    let steps = 1 + getSteps(next);
    
    // セーフティチェック（数値範囲外の場合）
    if (next > Number.MAX_SAFE_INTEGER) {
        // JavaScript の数値精度の問題を避けるため、BigInt を使用
        // ただし、指定通り 32bit/64bit で扱う必要がある場合のロジック
        // ここでは、実際には 64bit signed integer 範囲を超えないと仮定し、
        // Next が溢れる場合は通常の操作を行う（Overflow は想定外）
    }
    
    memo.set(next, steps);
    return steps;
}

let total = 0;

process.stdin.on('data', (chunk) => {
    const lines = chunk.toString().trim().split('\n');
    
    for (const line of lines) {
        if (!line.trim()) continue; // 空行をスキップ
        
        try {
            const n = parseInt(line.trim());
            if (!Number.isNaN(n)) {
                total += getSteps(n);
            } else {
                // 整数として解釈できない行は無視
            }
        } catch (e) {
            // 解析エラーの場合は無視
        }
    }

    process.stdin.once('close', () => {
        console.log(`total=${total}`);
    });
});

// Node.js v18+ では `process.stdin.once` が利用可能だが、
// バージョン互換性を考慮し、一般的なパターンとして `once` を使用
