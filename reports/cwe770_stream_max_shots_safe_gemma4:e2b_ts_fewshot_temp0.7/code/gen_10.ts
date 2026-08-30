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

    // 整数として解釈でき、64bit範囲内であるかを確認（ここでは一般的な数値の範囲で十分と仮定）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非数値要素を無視した後の、有効な整数の数と最大値を計算する。
// 課題の指示に従い、「カンマ区切りの整数列」から「要素数」と「最大値」を求める。
// ここでの解釈は、入力文字列に含まれるカンマで区切られたもの全てを対象とする。

let finalCount = 0;
let finalMaxValue = -Infinity;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈でき、有効な要素としてカウントする
    if (!isNaN(num)) {
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}

process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
