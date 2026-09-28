import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 要素数
        const countVal = parseInt(trimmedPart, 10);
        if (!isNaN(countVal)) {
            validCount++;
            count += countVal;
        } else {
            // 要素数が整数でない場合は無視（仕様上、整数として解釈できない要素を無視する）
        }
    }

    // 最大値の計算には、元のカンマ区切りの文字列全体を再走査する必要があるが、
    // 仕様を再確認すると「カンマ区切りの整数列を受け取る」ため、入力は整数のみで構成されていると解釈し、
    // その要素から最大値を求めるのが自然である。

    // 再度、入力文字列を解析して最大値を求める（より厳密に）
    let actualMax = -Infinity;
    const numbers = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    if (numbers.length > 0) {
        let maxVal = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] > maxVal) {
                maxVal = numbers[i];
            }
        }
        maxValue = maxVal;
    } else {
        // 数値が一つもなかった場合、最大値は定義できないか、0とする（ここでは-Infinityを保持する）
        maxValue = 0; // 空の列に対する最大値を0とするのが妥当かもしれないが、入力がない場合は0とする。
    }


    process.stdout.write(`count=${numbers.length} max=${maxValue}\n`);
}

solve();
