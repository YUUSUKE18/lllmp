import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const tokens = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const token of tokens) {
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    // 整数として解釈可能かチェック
    if (/^-?\d+$/.test(trimmedToken)) {
        const num = parseInt(trimmedToken, 10);
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非整数を無視した後のカウントと最大値を計算するロジックを再調整し、
// 厳密に「要素数」と「最大値」を求める。
// 仕様に基づき、カンマ区切りの文字列から有効な整数のみを抽出する。

let finalCount = 0;
let finalMaxValue = -Infinity;

for (const token of tokens) {
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    // 整数として解釈可能かチェック
    if (/^-?\d+$/.test(trimmedToken)) {
        const num = parseInt(trimmedToken, 10);
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}

process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
