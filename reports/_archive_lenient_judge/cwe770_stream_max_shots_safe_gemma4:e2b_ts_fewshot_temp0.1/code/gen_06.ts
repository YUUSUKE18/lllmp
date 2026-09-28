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

    // 整数として解釈できるかチェックし、64bit範囲内かチェックする（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
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
// ただし、例1, 2, 3の入力形式が「空白区切り」や「カンマ区切り」であり、
// この課題では「カンマ区切りの整数列」を受け取るため、split(',')の結果をそのまま処理する。

// 再度、より厳密に仕様を満たすように再実装する（特に空要素と非整数を無視する部分）

let finalCount = 0;
let finalMaxValue = -Infinity;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    // カンマ区切りのため、各要素が整数であるかを確認する。
    // parseIntで変換し、元の文字列が数字のみで構成されているか確認する（空白無視の要件を考慮）
    const num = Number(trimmedPart);
    if (!isNaN(num) && String(num) === trimmedPart) {
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}

// 最終的な結果を出力
process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
