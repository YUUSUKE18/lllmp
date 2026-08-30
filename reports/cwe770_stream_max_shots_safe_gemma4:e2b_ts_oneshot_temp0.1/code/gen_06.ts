import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/).filter(s => s.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const line of lines) {
        // カンマ区切りの整数列を処理するのではなく、入力全体がカンマ区切りの整数列と解釈されるため、
        // 各要素を個別に処理します。
        const parts = line.split(',').map(s => s.trim()).filter(s => s.length > 0);

        for (const part of parts) {
            const num = parseInt(part, 10);
            if (!isNaN(num)) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 注意: 入力形式が「カンマ区切りの整数列」であるため、入力全体を一つのストリームとして扱う方が自然です。
    // 例1の例に従い、標準入力全体を読み込み、その中から数値を抽出します。

    const allInput = input.split(/\s*,\s*/).flatMap(line => line.split(','));

    let finalCount = 0;
    let finalMaxValue = -Infinity;

    for (const item of allInput) {
        const num = parseInt(item, 10);
        if (!isNaN(num)) {
            finalCount++;
            if (num > finalMaxValue) {
                finalMaxValue = num;
            }
        }
    }

    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
