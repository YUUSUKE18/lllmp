import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値は定義しないため-Infinityなど）
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

        // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が数字のみで構成されていること）
        if (!isNaN(num) && String(num) === trimmedPart) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 整数として解釈できた要素数と最大値を計算する。
    // 仕様では「カンマ区切りの整数列を受け取る」ため、入力された全ての有効な整数をカウントし、その最大値を求める。
    // ここでの「要素数」は、入力文字列に含まれる有効な数値の個数とする。

    if (validCount === 0) {
        // 有効な整数が一つもなかった場合
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        process.stdout.write(`count=${validCount} max=${maxValue}\n`);
    }
}

solve();
