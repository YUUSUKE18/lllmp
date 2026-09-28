import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/);

    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const line of lines) {
        if (line === "") continue;

        // カンマ区切りの整数をパース
        const parts = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
        
        if (parts.length === 2) {
            const num1 = parseInt(parts[0], 10);
            const num2 = parseInt(parts[1], 10);

            // 整数であるか、64bit範囲内かを確認 (ここでは単純に数値として扱う)
            if (!isNaN(num1) && !isNaN(num2)) {
                validCount++;
                if (num1 > maxValue) {
                    maxValue = num1;
                }
                if (num2 > maxValue) {
                    maxValue = num2;
                }
            }
        }
    }

    // 最終的なカウントと最大値を決定するロジックを再構築（元の仕様の解釈が曖昧なため、一般的なカンマ区切りの整数列として解釈し直す）
    // 仕様：「カンマ区切りの整数列を受け取ります。」
    // 例: "1,5,3" のような形式を想定する。

    let allNumbers: number[] = [];
    
    for (const line of lines) {
        const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
        for (const numStr of numbers) {
            const num = parseInt(numStr, 10);
            if (!isNaN(num)) {
                allNumbers.push(num);
            }
        }
    }

    count = allNumbers.length;
    
    if (count === 0) {
        // 要素がない場合の処理（ここでは最大値は定義できないが、仕様に従い出力する）
        maxValue = 0; // または適切なデフォルト値。ここでは0とする。
    } else {
        maxValue = Math.max(...allNumbers);
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
