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

    // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非整数を無視した後のカウントと最大値を計算する。
// 仕様では「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」とあるため、
// 読み込んだ文字列から有効な整数のみを数える必要がある。

let finalCount = 0;
let finalMaxValue = -Infinity;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    if (!isNaN(num) && isFinite(num)) {
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}


process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
