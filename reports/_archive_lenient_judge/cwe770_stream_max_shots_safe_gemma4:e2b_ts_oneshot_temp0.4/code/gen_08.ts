import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値は定義できないため-Infinityを想定）
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック（NaNや範囲外の可能性を考慮）
        if (!isNaN(num)) {
            // 64bit整数の範囲内であるという制約は、JavaScriptのNumber型で十分カバーされると仮定する。
            // ただし、入力が非常に大きい場合はBigIntが必要だが、ここでは標準的な整数として扱う。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 処理された有効な要素数と最大値を計算する
    if (count === 0) {
        // 有効な整数が一つもなかった場合。仕様に厳密に従うため、ここでは count=0, max=-Infinity とする。
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
