import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値を定義しないため）
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxVal = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈可能かチェック（数値に変換して再確認する）
        const num = Number(trimmedPart);
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
        }
    }

    // 64bit整数の範囲に収まることを前提としているが、ここでは標準のNumber型で十分と判断する。
    // もし厳密にBigIntが必要な場合は、入力処理を変更する必要があるが、仕様に従い標準的な数値操作を行う。

    process.stdout.write(`count=${count} max=${maxVal}\n`);
}

solve();
