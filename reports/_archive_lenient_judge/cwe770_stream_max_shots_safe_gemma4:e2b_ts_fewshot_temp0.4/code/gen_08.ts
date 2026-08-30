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

    // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が数字のみで構成されていることを確認するため、ここでは単純にparseIntの結果をチェックする）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できた要素のみをカウントし、最大値を求める。
// 仕様では「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」とあるため、
// カンマで区切られた各要素が有効な整数であるかを厳密にチェックする必要がある。

let finalCount = 0;
let finalMaxValue = -Infinity;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    // 正規表現を使って、その部分が純粋な整数のみで構成されているか確認する（空白やその他の文字がないことを保証するため）
    if (/^\d+$/.test(trimmedPart)) {
        const num = parseInt(trimmedPart, 10);
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}

process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
