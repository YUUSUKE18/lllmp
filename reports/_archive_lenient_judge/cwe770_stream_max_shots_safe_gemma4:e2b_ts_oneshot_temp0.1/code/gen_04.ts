import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/).filter(s => s.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const line of lines) {
        // カンマ区切りの整数列を処理するのではなく、入力全体がカンマ区切りで与えられていると解釈し、
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

    // 仕様の解釈を再確認します。
    // 「カンマ区切りの整数列を受け取ります」という記述は、入力全体が「1,2,3,4」のような形式であることを示唆しています。
    // 例: 標準入力が "1,5,2,8" の場合、要素数は4、最大値は8となるべきです。

    const allNumbers = [];
    const inputTokens = input.split(',');

    for (const token of inputTokens) {
        const trimmedToken = token.trim();
        if (trimmedToken.length > 0) {
            const num = parseInt(trimmedToken, 10);
            if (!isNaN(num)) {
                allNumbers.push(num);
            }
        }
    }

    if (allNumbers.length === 0) {
        // 要素が一つもなかった場合、count=0, max=?。最大値の定義に依存するが、ここでは-Infinityまたは0とする。
        // 問題文から「要素数」と「最大値」を求めるため、要素がない場合は count=0, max=0 (またはエラー) とするのが自然だが、
        // 64bit整数範囲で負の値も許容されるため、空の場合は0を出力する。
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const finalCount = allNumbers.length;
    let finalMax = -Infinity;

    for (const num of allNumbers) {
        if (num > finalMax) {
            finalMax = num;
        }
    }

    process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
}

solve();
