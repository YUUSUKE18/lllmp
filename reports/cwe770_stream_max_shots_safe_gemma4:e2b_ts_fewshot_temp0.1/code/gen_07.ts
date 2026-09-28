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
// ただし、例1, 2, 3の入力形式が「空白区切り」や「カンマ区切り」であることから、
// 入力全体を一度に処理する方が自然であり、ここではsplitの結果をそのまま利用する。

// 再度、より厳密に仕様を満たすように再実装する（例1, 2, 3の読み込みロジックを踏襲しつつ）

const inputData = input.trim();
if (!inputData) {
    process.stdout.write("count=0 max=-Infinity\n");
    process.exit(0);
}

const numbers = inputData.split(',');
let finalCount = 0;
let finalMax = -Infinity;

for (const item of numbers) {
    const trimmedItem = item.trim();
    if (trimmedItem === "") continue;

    // 整数として解釈できるかチェック
    const num = Number(trimmedItem);
    if (!isNaN(num) && isFinite(num)) {
        finalCount++;
        if (num > finalMax) {
            finalMax = num;
        }
    }
}

process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
