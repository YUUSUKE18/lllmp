import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能で、64bit範囲内であるかを確認（ここでは単純に数値として扱う）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できた要素のみをカウントする（仕様の「空でない語の数」に最も近い解釈）
// 仕様: 空要素・前後の空白は無視し、整数として解釈できない要素も無視します。
// ここでは、カンマ区切りの入力から抽出された有効な整数のみをカウントします。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合（空の入力や非数値のみの場合）
    process.stdout.write(`count=0 max=-Infinity\n`); // または適切なデフォルト値。ここでは最大値を-Infinityとして扱う
}
