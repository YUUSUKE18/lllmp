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

    // 整数として解釈できるか確認し、64bit範囲内か確認する（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非数値要素を無視した上で、有効な数のカウントと最大値を計算する。
// 仕様では「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」とあるため、
// 読み込んだカンマ区切りの文字列から整数を抽出してカウントする。

let finalCount = 0;
let finalMaxValue = -Infinity;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    if (!isNaN(num)) {
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}


process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
