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
// 入力全体を一度に処理し、その中から抽出する方が安全かもしれない。

// 再度、より厳密に仕様を満たすように処理を調整する。
// カンマ区切りの整数列を読み込む。

let finalCount = 0;
let finalMaxValue = -Infinity;

const tokens = input.split(',');

for (const token of tokens) {
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    // 整数として解釈できるかチェック
    const num = Number(trimmedToken);
    if (!isNaN(num) && isFinite(num)) {
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}

// 最終的な結果を出力
process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
